"use client";

import { useState, useEffect } from "react";
import { applicationApi } from "@/lib/api/applications";
import { Application, Pet, User } from "@/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";

function AdminApplicationsContent() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationApi.getAllApplications();
      setApplications(data);
    } catch {
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    applicationId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      await applicationApi.updateApplicationStatus(applicationId, status);
      fetchApplications();
    } catch {
      setError("Failed to update application status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 inline-block"
          >
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Manage Applications
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600">No applications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications?.map((application) => {
              const pet = application.pet as Pet;
              const user = application.user as User;

              // Skip if pet or user data is missing
              if (!pet || !user) {
                return null;
              }

              return (
                <div
                  key={application._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-48 h-48 bg-gray-200">
                      {pet.imageUrl ? (
                        <img
                          src={pet.imageUrl}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {pet.name}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <p>
                              <span className="font-medium">Species:</span>{" "}
                              {pet.species}
                            </p>
                            <p>
                              <span className="font-medium">Breed:</span>{" "}
                              {pet.breed}
                            </p>
                            <p>
                              <span className="font-medium">Age:</span>{" "}
                              {pet.age} years
                            </p>
                          </div>
                          <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-900 mb-2">
                              Applicant Information:
                            </p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <span className="font-medium">Name:</span>{" "}
                                {user.username}
                              </p>
                              <p>
                                <span className="font-medium">Email:</span>{" "}
                                {user.email}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Applied on:{" "}
                                {new Date(
                                  application.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>
                        </div>
                      </div>
                      {application.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() =>
                              handleStatusUpdate(application._id, "approved")
                            }
                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(application._id, "rejected")
                            }
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminApplicationsContent />
    </ProtectedRoute>
  );
}
