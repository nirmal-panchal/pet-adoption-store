import Link from 'next/link';
import { Pet } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
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

  return (
    <Link href={`/pets/${pet._id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
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
          <div className="absolute top-3 right-3">
            <Badge variant={getStatusVariant(pet.status)} className="capitalize">
              {pet.status}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {pet.name}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Species</span>
              <span className="font-medium text-gray-900">{pet.species}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Breed</span>
              <span className="font-medium text-gray-900">{pet.breed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Age</span>
              <span className="font-medium text-gray-900">
                {pet.age} {pet.age === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>
          {pet.description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {pet.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
