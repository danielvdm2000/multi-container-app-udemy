import { createClient, RedisClientType } from 'redis';

export type CreateRedisClientAndPublisherSettings = Readonly<{
    redisHost: string,
    redisPort: number,
}>

export type RedisClient = ReturnType<typeof createClient>;

interface RedisClientAndPublisher {
    redisPublisher: RedisClient,
    redisClient: RedisClient,
}

export async function createRedisClientAndPublisher(settings: CreateRedisClientAndPublisherSettings): Promise<RedisClientAndPublisher> {
    const redisClient = createClient({
        socket: {
            host: settings.redisHost,
            port: settings.redisPort,
            reconnectStrategy: () => 1000,
        },
    });
    await redisClient.connect();
    const redisPublisher = redisClient.duplicate();
    await redisPublisher.connect();

    return { 
        redisPublisher: redisPublisher as RedisClientType, 
        redisClient: redisClient as RedisClientType,
    }
}