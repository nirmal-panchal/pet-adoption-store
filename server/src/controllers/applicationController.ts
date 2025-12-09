import { Response } from 'express';
import Application from '../models/Application';
import Pet from '../models/Pet';
import { AuthRequest } from '../middlewares/auth';

// Apply for pet adoption (Authenticated users)
export const applyForAdoption = async (req: AuthRequest, res: Response) => {
  try {
    const { petId, message } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if pet exists and is available
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.status !== 'available') {
      return res.status(400).json({ message: 'Pet is not available for adoption' });
    }

    // Check if user already applied for this pet
    const existingApplication = await Application.findOne({ user: userId, pet: petId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this pet' });
    }

    // Create application
    const application = new Application({
      user: userId,
      pet: petId,
      message,
      status: 'pending'
    });

    await application.save();

    // Update pet status to pending
    pet.status = 'pending';
    await pet.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's own applications (Authenticated users)
export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const applications = await Application.find({ user: userId })
      .populate('pet', 'name species breed age imageUrl status')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all applications (Admin only)
export const getAllApplications = async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = '1', limit = '10' } = req.query;

    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const applications = await Application.find(query)
      .populate('user', 'username email')
      .populate('pet', 'name species breed age imageUrl status')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Application.countDocuments(query);

    res.json({
      applications,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single application details (Admin only)
export const getApplicationById = async (req: AuthRequest, res: Response) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('user', 'username email')
      .populate('pet', 'name species breed age description imageUrl status');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ application });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application status (Admin only)
export const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId).populate('pet');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update application status
    application.status = status;
    await application.save();

    // Update pet status based on application decision
    const pet = await Pet.findById(application.pet);
    if (pet) {
      if (status === 'approved') {
        // Mark pet as adopted
        pet.status = 'adopted';
        await pet.save();

        // Reject all other pending applications for this pet
        await Application.updateMany(
          { pet: pet._id, _id: { $ne: applicationId }, status: 'pending' },
          { status: 'rejected' }
        );
      } else if (status === 'rejected') {
        // Check if there are any other pending applications
        const pendingCount = await Application.countDocuments({
          pet: pet._id,
          status: 'pending'
        });

        // If no pending applications, set pet back to available
        if (pendingCount === 0) {
          pet.status = 'available';
          await pet.save();
        }
      }
    }

    res.json({ message: 'Application status updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get applications for a specific pet (Admin only)
export const getApplicationsByPet = async (req: AuthRequest, res: Response) => {
  try {
    const petId = req.params.petId;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const applications = await Application.find({ pet: petId })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
