import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

// Create a new ratelimiter, that allows 2 requests per 30 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "30 s"),
  analytics: true,
  timeout: 15000, //15 sec timeout
});