import Redis from "redis";

const redisClient = Redis.createClient({
  url: "redis://redis:6379",
});

export default redisClient;
