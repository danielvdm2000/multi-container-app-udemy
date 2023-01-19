import { addValue } from '../add-value';
import { RedisClient } from "../../setup/create-redis-client-and-publisher";
import { Pool } from 'pg';
import { Request, Response } from 'express';

describe('addValue', () => {
    let req: Request;
    let res: Response;
    let mockRedisClient: RedisClient;
    let mockRedisPublisher: RedisClient;
    let mockPgPool: Pool;

    beforeEach(() => {
        req = { body: { index: '1' } } as any as Request;
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as any as Response;
        mockRedisClient = {
            hSet: jest.fn()
        } as any as RedisClient;
        mockRedisPublisher = {
            publish: jest.fn()
        } as any as RedisClient;
        mockPgPool = {
            query: jest.fn()
        } as any as Pool;
    });

    test('should insert value in Redis and postgres and return success', async () => {
        await addValue(mockRedisClient, mockRedisPublisher, mockPgPool)(req, res);

        expect(mockRedisClient.hSet).toHaveBeenCalledWith('values', '1', 'Nothing yet!');
        expect(mockRedisPublisher.publish).toHaveBeenCalledWith('insert', '1');
        expect(mockPgPool.query).toHaveBeenCalledWith('INSERT INTO values(number) VALUES($1)', ['1']);
        expect(res.send).toHaveBeenCalledWith({ working: true });
    });

    test('should return 422 if index is too high', async () => {
        req.body.index = '41';

        await addValue(mockRedisClient, mockRedisPublisher, mockPgPool)(req, res);

        expect(mockRedisClient.hSet).not.toHaveBeenCalled();
        expect(mockRedisPublisher.publish).not.toHaveBeenCalled();
        expect(mockPgPool.query).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('Index too high');
    });
});