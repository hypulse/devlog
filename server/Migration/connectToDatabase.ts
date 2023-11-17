import redisClient from "./redis";
import sequelize from "./sequelize";

const connectToRedis = async () => {
  if (redisClient.isOpen) {
    return Promise.resolve();
  } else {
    return redisClient.connect();
  }
};

async function connectToDatabase(): Promise<void> {
  try {
    Promise.all([sequelize.authenticate(), connectToRedis()]);
  } catch (error) {
    throw error;
  }
}

export default connectToDatabase;
