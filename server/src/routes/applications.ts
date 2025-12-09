import express from 'express';
import {
  applyForAdoption,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getApplicationsByPet
} from '../controllers/applicationController';
import { authenticate, isAdmin } from '../middlewares/auth';
import { validateApplication, validateUpdateApplicationStatus } from '../middlewares/validate';

const router = express.Router();

// User routes (authenticated users only)
router.post('/', authenticate, validateApplication, applyForAdoption); // POST /api/applications - Apply for pet adoption
router.get('/my', authenticate, getMyApplications); // GET /api/applications/my - Get user's own applications

// Admin only routes
router.get('/', authenticate, isAdmin, getAllApplications); // GET /api/applications - Get all applications (with pagination)
router.get('/pet/:petId', authenticate, isAdmin, getApplicationsByPet); // GET /api/applications/pet/:petId - Get applications for specific pet
router.get('/:id', authenticate, isAdmin, getApplicationById); // GET /api/applications/:id - Get single application details
router.patch('/:id/status', authenticate, isAdmin, validateUpdateApplicationStatus, updateApplicationStatus); // PATCH /api/applications/:id/status - Update application status

export default router;
