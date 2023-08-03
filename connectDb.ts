import mongoose, { ConnectOptions, Mongoose } from "mongoose";

mongoose.set("strictQuery", false);

async function connectDb(): Promise<Mongoose> {
  console.log("Connecting to database...");
  try {
    const uri = process.env.NEXT_PUBLIC_DB_URI;
    if (!uri) throw new Error("No database URI provided");
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to database");
    return db;
  } catch (error) {
    console.log("Error connecting to database:", error);
    throw error;
  }
}

export default connectDb;
