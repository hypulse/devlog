import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("strictQuery", false);

async function connectToDatabase(): Promise<void> {
  const DATABASE_URI = process.env.DATABASE_URI;

  if (!DATABASE_URI) {
    throw new Error("Database URI missing.");
  }

  const connectionOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;

  try {
    await mongoose.connect(DATABASE_URI, connectionOptions);
  } catch (error) {
    throw error;
  }
}

export default connectToDatabase;
