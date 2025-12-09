import express from 'express';
import { register, login } from '../controllers/authController';
import { validateRegister, validateLogin } from '../middlewares/validate';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', validateRegister, register);

// POST /api/auth/login - Login user
router.post('/login', validateLogin, login);

export default router;
