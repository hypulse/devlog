import redisClient from "./redis";
import sequelize from "./sequelize";

async function connectToDatabase(): Promise<void> {
  try {
    Promise.all([sequelize.authenticate(), redisClient.connect()]);
  } catch (error) {
    throw error;
  }
}

export default connectToDatabase;
