import express from 'express';
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
} from '../controllers/petController';
import { authenticate, isAdmin } from '../middlewares/auth';
import { validateCreatePet, validateUpdatePet } from '../middlewares/validate';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllPets); // GET /api/pets - List all pets with search, filter, pagination
router.get('/:id', getPetById); // GET /api/pets/:id - Get single pet details

// Admin only routes
router.post('/', authenticate, isAdmin, validateCreatePet, createPet); // POST /api/pets - Create new pet
router.put('/:id', authenticate, isAdmin, validateUpdatePet, updatePet); // PUT /api/pets/:id - Update pet
router.delete('/:id', authenticate, isAdmin, deletePet); // DELETE /api/pets/:id - Delete pet

export default router;
