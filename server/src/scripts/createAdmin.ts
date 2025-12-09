import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@petadoption.com' });

    if (existingAdmin) {
      // Update existing user to admin role
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('✅ User updated to admin role!');
      console.log('');
      console.log('Login credentials:');
      console.log('Email: admin@petadoption.com');
      console.log('Password: (your existing password)');
      process.exit(0);
    }

    // Create admin user with different username to avoid conflicts
    const adminUser = new User({
      username: 'adminuser',
      email: 'admin@petadoption.com',
      password: 'admin123', // This will be hashed automatically by the User model
      role: 'admin'
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('Email: admin@petadoption.com');
    console.log('Password: admin123');
    console.log('');
    console.log('⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();
