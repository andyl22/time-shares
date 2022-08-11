import mongoose from 'mongoose';

// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI === null) {
  throw new Error('Define the mongodb connection in env settings');
}

// eslint-disable-next-line no-undef
let cached = global.mongoose;

// eslint-disable-next-line no-undef
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
