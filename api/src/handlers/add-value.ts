import { Request, Response } from "express";
import { Pool } from "pg";
import { RedisClient } from "../setup/create-redis-client-and-publisher";

export function addValue(redisClient: RedisClient, redisPublisher: RedisClient, pgPool: Pool) {
    return async (req: Request, res: Response) => {
        const index = req.body.index;

        if (parseInt(index) > 40) {
            return res.status(422).send('Index too high');
        }
    
        redisClient.hSet('values', index, 'Nothing yet!');
        redisPublisher.publish('insert', index);
        pgPool.query('INSERT INTO values(number) VALUES($1)', [index]);
    
        res.send({ working: true });
    }
}