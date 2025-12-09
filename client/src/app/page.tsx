'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Find your new best friend
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Browse adoptable pets from shelters and rescues. Give a loving animal a second chance at happiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 h-12">
                <Link href="/pets">
                  Browse Pets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button asChild variant="outline" size="lg" className="h-12">
                  <Link href="/register">
                    Create Account
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Pets Adopted' },
              { value: '5,000+', label: 'Happy Families' },
              { value: '100+', label: 'Partner Shelters' },
              { value: '50+', label: 'Cities' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why adopt with us
            </h2>
            <p className="text-lg text-gray-600">
              We make the adoption process simple, transparent, and secure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Verified Listings',
                description: 'All pets and shelters are verified to ensure authenticity and safety.',
              },
              {
                title: 'Simple Application',
                description: 'Apply to adopt with just a few clicks. Track your application status online.',
              },
              {
                title: 'Expert Support',
                description: 'Get guidance throughout the adoption process from our experienced team.',
              },
            ].map((feature) => (
              <div key={feature.title}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to adoption
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Search & Browse',
                description: 'Find pets that match your lifestyle and preferences using our advanced search filters.',
              },
              {
                step: '2',
                title: 'Apply Online',
                description: 'Submit your adoption application directly through our platform in minutes.',
              },
              {
                step: '3',
                title: 'Meet & Adopt',
                description: 'Connect with the shelter, meet your new pet, and complete the adoption process.',
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="text-5xl font-bold text-gray-200 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to adopt?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our available pets and start your adoption journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="h-12">
              <Link href="/pets">
                View Available Pets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild size="lg" variant="outline" className="h-12 bg-transparent text-white border-white hover:bg-white/10">
                <Link href="/register">
                  Create Account
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
