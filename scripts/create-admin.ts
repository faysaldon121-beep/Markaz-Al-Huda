// scripts/create-admin.ts
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/db/models/User';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  await connectDB();

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@markazalhuda.com',
    password: hashedPassword,
    role: 'admin',
    languages: ['en', 'es', 'de', 'ur', 'hi', 'ru'],
    isActive: true,
  });

  console.log('Admin user created:', admin.email);
  process.exit(0);
}

createAdmin();
