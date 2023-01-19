import { Express } from 'express'
import { Pool } from 'pg';
import { RedisClient } from './create-redis-client-and-publisher';
import { getAllValues } from '../handlers/get-all-values'
import { getCurrentValues } from '../handlers/get-current-values'
import { addValue } from '../handlers/add-value'

export function setupExpressRoutes(app: Express, pgPool: Pool, redisClient: RedisClient, redisPublisher: RedisClient) {
    app.get('/', (req, res) => {
        res.send('HI');
    });

    app.get('/values/all', getAllValues(pgPool));
    app.get('/values/current', getCurrentValues(redisClient));
    app.post('/values', addValue(redisClient, redisPublisher, pgPool));
}