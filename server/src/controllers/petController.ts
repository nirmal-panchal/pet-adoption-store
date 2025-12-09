import { Request, Response } from 'express';
import Pet from '../models/Pet';
import { AuthRequest } from '../middlewares/auth';

// Get all pets with search, filter, and pagination
export const getAllPets = async (req: Request, res: Response) => {
  try {
    const { search, species, breed, minAge, maxAge, status, page = '1', limit = '10' } = req.query;

    // Build query object
    const query: any = {};

    // Search by name or breed
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { breed: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by species
    if (species) {
      query.species = { $regex: species, $options: 'i' };
    }

    // Filter by breed (additional to search)
    if (breed && !search) {
      query.breed = { $regex: breed, $options: 'i' };
    }

    // Filter by age range
    if (minAge !== undefined || maxAge !== undefined) {
      query.age = {};
      if (minAge !== undefined) query.age.$gte = Number(minAge);
      if (maxAge !== undefined) query.age.$lte = Number(maxAge);
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const pets = await Pet.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Pet.countDocuments(query);

    res.json({
      data: pets,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single pet by ID
export const getPetById = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new pet (Admin only)
export const createPet = async (req: AuthRequest, res: Response) => {
  try {
    const { name, species, breed, age, description, imageUrl } = req.body;

    const pet = new Pet({
      name,
      species,
      breed,
      age,
      description,
      imageUrl,
      status: 'available'
    });

    await pet.save();

    res.status(201).json({ message: 'Pet created successfully', pet });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update pet (Admin only)
export const updatePet = async (req: AuthRequest, res: Response) => {
  try {
    const { name, species, breed, age, description, imageUrl, status } = req.body;

    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Update fields
    if (name !== undefined) pet.name = name;
    if (species !== undefined) pet.species = species;
    if (breed !== undefined) pet.breed = breed;
    if (age !== undefined) pet.age = age;
    if (description !== undefined) pet.description = description;
    if (imageUrl !== undefined) pet.imageUrl = imageUrl;
    if (status !== undefined) pet.status = status;

    await pet.save();

    res.json({ message: 'Pet updated successfully', pet });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete pet (Admin only)
export const deletePet = async (req: AuthRequest, res: Response) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    await Pet.findByIdAndDelete(req.params.id);

    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
