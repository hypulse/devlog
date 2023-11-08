import sequelize from "./sequelize";

async function connectToDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw error;
  }
}

export default connectToDatabase;
