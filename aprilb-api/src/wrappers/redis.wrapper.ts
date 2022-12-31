import redis, { createClient, RedisClientType } from "redis";
type RedisClient = RedisClientType<
  redis.RedisModules,
  redis.RedisFunctions,
  redis.RedisScripts
>;

class RedisWrapper {
  private static _client: RedisClient;

  static async getClient(): Promise<RedisClient> {
    if (this._client) {
      return this._client;
    }

    const client = createClient({
      url: process.env.REDIS_CONNECTION_STRING,
      disableOfflineQueue: true,
    });

    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();

    this._client = client;
    return client;
  }
}

export default RedisWrapper;
