import { createClient } from "@redis/client";

const redisClient = createClient({
  url: `redis://${process.env.DB_REDIS_HOST}:6379`,
});

export default redisClient;
