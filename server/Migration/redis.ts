import { createClient } from "@redis/client";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

export default redisClient;
