import express from 'express';
import { register, login } from '../controllers/authControllers.js';

const router = express.Router();

// Ruta de registro
router.post('/register', register);

// Ruta de login
router.post('/login', login);

export default router;
