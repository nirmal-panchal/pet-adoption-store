"use client";

import { useState, useEffect } from "react";
import { applicationApi } from "@/lib/api/applications";
import { Application, Pet } from "@/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Calendar, ArrowRight, FileText } from "lucide-react";

function DashboardContent() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationApi.getMyApplications();
      setApplications(data);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
    switch (status) {
      case "pending":
        return "secondary";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-lg text-gray-600">
            Track the status of your adoption applications
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </div>
        ) : applications.length === 0 ? (
          /* Empty State */
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No applications yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven&apos;t applied for any pets yet. Start browsing to find your perfect companion.
              </p>
              <Button asChild className="bg-gray-900 hover:bg-gray-800">
                <Link href="/pets">Browse Available Pets</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Applications List */
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {applications.length} application{applications.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="space-y-6">
              {applications?.map((application) => {
                const pet = application.pet as Pet;

                // Skip if pet data is missing
                if (!pet) {
                  return null;
                }

                return (
                  <Card key={application._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      {/* Pet Image */}
                      <div className="md:w-64 h-64 bg-gray-100 relative">
                        {pet.imageUrl ? (
                          <img
                            src={pet.imageUrl}
                            alt={pet.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-20 h-20 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Application Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                              {pet.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Application for adoption
                            </p>
                          </div>
                          <Badge variant={getStatusVariant(application.status)} className="capitalize">
                            {application.status}
                          </Badge>
                        </div>

                        <Separator className="my-4" />

                        {/* Pet Information */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Species</span>
                            <span className="font-medium text-gray-900">{pet.species}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Breed</span>
                            <span className="font-medium text-gray-900">{pet.breed}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Age</span>
                            <span className="font-medium text-gray-900">
                              {pet.age} {pet.age === 1 ? 'year' : 'years'}
                            </span>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Application Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Applied on {new Date(application.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <Button asChild variant="ghost" className="gap-2">
                            <Link href={`/pets/${pet._id}`}>
                              View Pet
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
