import mongoose from "mongoose";

mongoose.set("strictQuery", false);

async function connectDb() {
  console.log("Connecting to database...");
  try {
    const uri = process.env.DB_URI;
    if (!uri) throw new Error("No database URI provided");
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
    return db;
  } catch (error) {
    console.log("Error connecting to database:", error);
    throw error;
  }
}

export default connectDb;
