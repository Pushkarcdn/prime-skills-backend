import { createClient } from "redis";
import { redis } from "../configs/env.config.js";

// creating Redis client
const redisClient = createClient({
  username: redis.username,
  password: redis.password,
  socket: {
    host: redis.host,
    port: redis.port,
  },
});

// logging for debugging purposes
redisClient.on("error", (err) => {
  console.error("Redis Client Error: ", err.message);
  process.exit(1);
});
redisClient.on("connect", () => {
  console.info("Connected to Redis.");
});

// connecting to Redis
await redisClient.connect();

export { redisClient };
