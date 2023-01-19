import { createExpressApp } from './setup/create-express-app';
import { createPostgresPool } from './setup/create-postgres-pool';
import { createRedisClientAndPublisher } from './setup/create-redis-client-and-publisher';
import { getSettings } from './setup/get-settings';
import { setupExpressRoutes } from './setup/setup-express-routes'
import { startExpressApp } from './setup/start-express-app'

async function main() {
    const settings = getSettings();
    const app = createExpressApp();
    const pgPool = createPostgresPool(settings);
    const { redisPublisher, redisClient } = await createRedisClientAndPublisher(settings);
    setupExpressRoutes(app, pgPool, redisClient, redisPublisher);
    startExpressApp(app, settings);
}

main();