import mongoose from 'mongoose';

const { DB_USER, DB_PW, DB_DOMAIN, DB_PROJECT } = process.env;
const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_DOMAIN}.orplk.mongodb.net/?retryWrites=true&w=majority&appName=${DB_PROJECT}`;

if (!MONGODB_URI) {
   throw new Error('MONGO_URI is not defined in the environment variables');
}

let isConnected = false; // Track the connection state

export default async function dbConnect(): Promise<void> {
   if (isConnected) {
      return; // If already connected, do nothing
   }
   console.log('Mongoose connection state:', mongoose.connection.readyState);
   try {
      const db = await mongoose.connect(MONGODB_URI);
      isConnected = db.connections[0].readyState === 1; // 1 means connected
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
   }
}
