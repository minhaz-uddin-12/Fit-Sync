import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { validate } from '../middleware/validate.js';
import { userSchema } from '../utils/validators.js';
import User from '../models/User.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Rate limiting for auth requests
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { error: 'Too many attempts, please try again later' }
});

/* BACKEND DEVELOPER 1
 * Responsible for:
 * - Authentication routes
 * - JWT management
 * - Security middleware
 * - User session handling
 * CRUD Operations:
 * - CREATE: Register users
 * - READ: Verify tokens
 * - UPDATE: Password reset
 */

// CREATE - Register privileged user (admin/trainer)
router.post('/register-privileged', authenticate, authorize('admin'), validate(userSchema), async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!['admin', 'trainer'].includes(role)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid role specified. Only admin and trainer roles are allowed.'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: 'error',
        message: 'Email is already registered'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      status: 'success',
      message: `${role} account created successfully`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// CREATE - Register regular user (member)
router.post('/register', validate(userSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Force role to be 'member' for public registration
    const role = 'member';

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: 'error',
        message: 'Email is already registered'
      });
    }

    // REMOVE manual hashing, let pre-save hook hash the password
    const user = await User.create({
      name,
      email,
      password,
      role: 'member' // <-- Ensure role is set
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include role in registration token
      process.env.JWT_SECRET,
      { 
        expiresIn: '7d',
        algorithm: 'HS256'
      }
    );

    res.status(201).json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Add this line
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

/* BACKEND DEVELOPER 2
 * Responsible for:
 * - User verification
 * - Session management
 * - Error handling
 */

// CREATE - User login and token generation
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Get full Mongoose document for password comparison and role check
    const user = await User.findOne({ email }).select('+password +role');
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Use bcrypt.compare for password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    if (user.role !== role) {
      return res.status(401).json({
        status: 'error',
        message: `Invalid role selected. You are registered as a ${user.role}`
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      status: 'success',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

// READ - Verify user token
router.get('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout (optional - client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
