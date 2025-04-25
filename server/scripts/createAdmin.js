import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin account already exists');
      process.exit(0);
    }

    // Create admin account
    const adminData = {
      name: 'Admin',
      email: 'admin@fitsync.com',
      password: await bcrypt.hash('Admin@123', 10),
      role: 'admin'
    };

    const admin = await User.create(adminData);
    console.log('Admin account created successfully:', {
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

  } catch (error) {
    console.error('Error creating admin:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

createAdmin();
