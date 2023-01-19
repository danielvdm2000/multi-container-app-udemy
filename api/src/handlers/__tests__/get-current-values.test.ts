import { getCurrentValues } from '../get-current-values';
import { RedisClient } from "../../setup/create-redis-client-and-publisher";
import { Request, Response } from 'express';

describe('getCurrentValues', () => {
    let req: Request;
    let res: Response;
    let mockRedisClient: RedisClient;

    beforeEach(() => {
        req = {} as Request;
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnValue({ send: jest.fn() })
        } as any as Response;
        mockRedisClient = {
            hGetAll: jest.fn()
        } as any as RedisClient;
    });

    test('should get all values from redis and return them', async () => {
        const mockValues = { '1': 'value 1', '2': 'value 2' };
        (mockRedisClient.hGetAll as jest.Mock<any, any>).mockResolvedValue(mockValues);

        await getCurrentValues(mockRedisClient)(req, res);

        expect(mockRedisClient.hGetAll).toHaveBeenCalledWith('values');
        expect(res.send).toHaveBeenCalledWith(mockValues);
    });

    test('should return 500 status code if redis returns an error', async () => {
        (mockRedisClient.hGetAll as jest.Mock<any, any>).mockRejectedValue(new Error());

        await getCurrentValues(mockRedisClient)(req, res);

        expect(mockRedisClient.hGetAll).toHaveBeenCalledWith('values');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status(500).send).toHaveBeenCalled();
    });
});
