import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for user registration
export const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
  handleValidationErrors
];

// Validation rules for user login
export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Validation rules for creating a pet
export const validateCreatePet = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Pet name is required'),
  body('species')
    .trim()
    .notEmpty()
    .withMessage('Species is required'),
  body('breed')
    .trim()
    .notEmpty()
    .withMessage('Breed is required'),
  body('age')
    .isInt({ min: 0 })
    .withMessage('Age must be a positive integer'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  handleValidationErrors
];

// Validation rules for updating a pet
export const validateUpdatePet = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Pet name cannot be empty'),
  body('species')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Species cannot be empty'),
  body('breed')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Breed cannot be empty'),
  body('age')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Age must be a positive integer'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('status')
    .optional()
    .isIn(['available', 'adopted', 'pending'])
    .withMessage('Status must be available, adopted, or pending'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  handleValidationErrors
];

// Validation rules for adoption application
export const validateApplication = [
  body('petId')
    .notEmpty()
    .withMessage('Pet ID is required')
    .isMongoId()
    .withMessage('Invalid pet ID'),
  body('message')
    .optional()
    .trim(),
  handleValidationErrors
];

// Validation rules for updating application status
export const validateUpdateApplicationStatus = [
  body('status')
    .isIn(['pending', 'approved', 'rejected'])
    .withMessage('Status must be pending, approved, or rejected'),
  handleValidationErrors
];
