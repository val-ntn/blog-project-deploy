// backend/routes/auth.js

import express from 'express';
import {
  login,
  logout,
  getMe
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken, getMe);

export default router;
