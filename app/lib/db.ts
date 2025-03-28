import mongoose from "mongoose";

// Augment the globalThis type to include mongoose property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("please define mongodb uri in envlocal file");

// Initialize cached with proper type checking
const cached: {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
} = global.mongoose ?? { conn: null, promise: null };

// Assign to global.mongoose if not set
if (!global.mongoose) {
  global.mongoose = cached;
}

// Function for connecting to the database
export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (_error) {
    cached.promise = null;
    console.log(_error)
    throw new Error("check database file");
  }
}