import { createRedisClientAndPublisher } from '../create-redis-client-and-publisher';

jest.mock('redis', () => {
    const mockClient = jest.fn(() => ({
        connect: jest.fn().mockResolvedValue(null),
        duplicate: jest.fn().mockReturnValue({
            connect: jest.fn().mockResolvedValue(null)
        }),
    }));
    return { createClient: mockClient };
});

describe('createRedisClientAndPublisher', () => {
    const mockSettings = {
        redisHost: 'localhost',
        redisPort: 6379,
    };

    let redisClientAndPublisher: any;

    beforeEach(async () => {
        redisClientAndPublisher = await createRedisClientAndPublisher(mockSettings);
    });

    test('returns an object with redisClient and redisPublisher properties', () => {
        expect(redisClientAndPublisher).toBeTruthy();
        expect(redisClientAndPublisher.redisClient).toBeTruthy();
        expect(redisClientAndPublisher.redisPublisher).toBeTruthy();
    });

    test('connects to redisClient and redisPublisher', () => {
        expect(redisClientAndPublisher.redisClient.connect).toHaveBeenCalled();
        expect(redisClientAndPublisher.redisPublisher.connect).toHaveBeenCalled();
    });
});