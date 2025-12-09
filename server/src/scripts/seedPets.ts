import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pet from '../models/Pet';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption';

const dummyPets = [
  {
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    description: 'Friendly and energetic golden retriever who loves to play fetch and swim. Great with kids and other pets.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500',
  },
  {
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 2,
    description: 'Beautiful and calm Persian cat. Loves to cuddle and enjoys quiet environments.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500',
  },
  {
    name: 'Charlie',
    species: 'Dog',
    breed: 'Labrador',
    age: 4,
    description: 'Loyal and playful Labrador. Well-trained and perfect for active families.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=500',
  },
  {
    name: 'Bella',
    species: 'Cat',
    breed: 'Siamese',
    age: 1,
    description: 'Young and curious Siamese cat. Very vocal and loves attention.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=500',
  },
  {
    name: 'Rocky',
    species: 'Dog',
    breed: 'German Shepherd',
    age: 5,
    description: 'Protective and intelligent. Excellent guard dog and family companion.',
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=500',
  },
  {
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Maine Coon',
    age: 3,
    description: 'Large and gentle Maine Coon. Very friendly and loves to play.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500',
  },
  {
    name: 'Buddy',
    species: 'Dog',
    breed: 'Beagle',
    age: 2,
    description: 'Energetic beagle with a great nose. Loves outdoor adventures and treats.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500',
  },
  {
    name: 'Mittens',
    species: 'Cat',
    breed: 'British Shorthair',
    age: 4,
    description: 'Calm and independent. Perfect for apartment living.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500',
  },
  {
    name: 'Duke',
    species: 'Dog',
    breed: 'Bulldog',
    age: 6,
    description: 'Calm and loving bulldog. Great with children and enjoys lounging around.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500',
  },
  {
    name: 'Shadow',
    species: 'Cat',
    breed: 'Ragdoll',
    age: 2,
    description: 'Gentle and affectionate Ragdoll. Follows you everywhere like a shadow.',
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?w=500',
  },
];

const seedPets = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing pets
    await Pet.deleteMany({});
    console.log('Cleared existing pets');

    // Insert dummy pets
    await Pet.insertMany(dummyPets);
    console.log('Successfully added 10 dummy pets');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding pets:', error);
    process.exit(1);
  }
};

seedPets();
