import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Clerk } from '@clerk/clerk-sdk-node';

// Load environment variables
dotenv.config();

// Initialize Clerk client
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// MongoDB connection function
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// User Schema (simplified version for the script)
const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function syncClerkEmails() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();

    console.log('Fetching users from MongoDB...');
    const mongoUsers = await User.find({});

    console.log(`Found ${mongoUsers.length} users in MongoDB`);

    for (const mongoUser of mongoUsers) {
      try {
        console.log(`Processing user ${mongoUser.clerkId}...`);
        
        // Get user from Clerk
        const clerkUser = await clerk.users.getUser(mongoUser.clerkId);
        
        // Get primary email
        const primaryEmailId = clerkUser.primaryEmailAddressId;
        const primaryEmail = clerkUser.emailAddresses.find(email => email.id === primaryEmailId);

        if (primaryEmail?.emailAddress !== mongoUser.email) {
          console.log(`Updating email for user ${mongoUser.clerkId}`);
          console.log(`Old email: ${mongoUser.email}`);
          console.log(`New email: ${primaryEmail?.emailAddress}`);

          mongoUser.email = primaryEmail?.emailAddress;
          await mongoUser.save();
        }
      } catch (error) {
        console.error(`Error processing user ${mongoUser.clerkId}:`, error);
      }
    }

    console.log('Email sync completed successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error syncing emails:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

syncClerkEmails(); 