import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface MongooseCache {
  conn: mongoose.Connection | typeof import("mongoose") | null;
  promise: Promise<mongoose.Connection | typeof import("mongoose")> | null;
}

declare global {
  var _mongooseCache: MongooseCache; // Use _ to indicate internal use
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongoose) => {
            return mongoose;
        });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
