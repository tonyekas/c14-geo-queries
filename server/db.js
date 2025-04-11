import mongoose from "mongoose";

// const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/c14-geo-queries'
const mongo_uri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/c14-geo-queries";

let connectionPromise = null;

export async function connectDb() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongo_uri);
  }
  return await connectionPromise;
}

export async function disconnectDb() {
  if (connectionPromise) {
    const mongoose = await connectionPromise;
    await mongoose.connection.close();
    connectionPromise = null;
  }
}
