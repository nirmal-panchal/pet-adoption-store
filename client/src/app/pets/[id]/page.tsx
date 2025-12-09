'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { petApi } from '@/lib/api/pets';
import { applicationApi } from '@/lib/api/applications';
import { Pet } from '@/types';
import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Heart, Check, AlertCircle } from 'lucide-react';

export default function PetDetailPage() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPet(params.id as string);
    }
  }, [params.id]);

  const fetchPet = async (id: string) => {
    try {
      setLoading(true);
      const data = await petApi.getPetById(id);
      setPet(data);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || 'Failed to fetch pet details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      setError('');
      await applicationApi.applyForPet(pet!._id);
      setApplicationSuccess(true);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'available':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'adopted':
        return 'outline';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Pet not found'}</p>
          <Button asChild variant="outline">
            <Link href="/pets">Back to Pets</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/pets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pets
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <Card className="overflow-hidden">
              <div className="aspect-square relative bg-gray-100">
                {pet.imageUrl ? (
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-32 h-32 text-gray-300"
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
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {pet.name}
                  </h1>
                  <Badge variant={getStatusVariant(pet.status)} className="capitalize">
                    {pet.status}
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Pet Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Pet Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Species</span>
                      <span className="font-medium text-gray-900">{pet.species}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Breed</span>
                      <span className="font-medium text-gray-900">{pet.breed}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Age</span>
                      <span className="font-medium text-gray-900">
                        {pet.age} {pet.age === 1 ? 'year' : 'years'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              {pet.description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      About {pet.name}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {pet.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Application Section */}
              {pet.status === 'available' && (
                <Card>
                  <CardContent className="p-6">
                    {applicationSuccess ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-green-700">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Application Submitted!</h3>
                            <p className="text-sm text-gray-600">
                              We&apos;ll review your application and get back to you soon.
                            </p>
                          </div>
                        </div>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/dashboard">View My Applications</Link>
                        </Button>
                      </div>
                    ) : isAuthenticated ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Ready to adopt {pet.name}?
                          </h3>
                          <p className="text-sm text-gray-600">
                            Submit your application and we&apos;ll get back to you within 24 hours.
                          </p>
                        </div>
                        {error && (
                          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <p className="text-sm text-red-800">{error}</p>
                          </div>
                        )}
                        <Button
                          onClick={handleApply}
                          disabled={applying}
                          className="w-full bg-gray-900 hover:bg-gray-800 h-11"
                        >
                          {applying ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Heart className="w-4 h-4 mr-2" />
                              Apply to Adopt
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Want to adopt {pet.name}?
                          </h3>
                          <p className="text-sm text-gray-600">
                            Sign in or create an account to submit your adoption application.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Button asChild variant="outline" className="flex-1 h-11">
                            <Link href="/login">Sign In</Link>
                          </Button>
                          <Button asChild className="flex-1 bg-gray-900 hover:bg-gray-800 h-11">
                            <Link href="/register">Create Account</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {pet.status === 'adopted' && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-2">
                        {pet.name} has been adopted and is no longer available.
                      </p>
                      <Button asChild variant="outline">
                        <Link href="/pets">View Other Pets</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {pet.status === 'pending' && !applicationSuccess && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-yellow-700">
                      <AlertCircle className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Application Pending</p>
                        <p className="text-sm text-gray-600">
                          Someone has already applied to adopt {pet.name}. Check back later.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
