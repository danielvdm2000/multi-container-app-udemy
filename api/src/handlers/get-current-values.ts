import { Request, Response } from "express";
import { RedisClient } from "../setup/create-redis-client-and-publisher";

export function getCurrentValues(redisClient: RedisClient) {
    return async (req: Request, res: Response) => {
        try {
            const values = await redisClient.hGetAll('values')
            res.send(values);
        } catch {
            res.status(500).send();
        }
    }
}