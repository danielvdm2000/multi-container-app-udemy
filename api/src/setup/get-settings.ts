import { CreatePostgresPoolSettings } from "./create-postgres-pool";
import { CreateRedisClientAndPublisherSettings } from "./create-redis-client-and-publisher";
import { StartExpressAppSettings } from "./start-express-app";

export type Settings = Readonly<
    & CreatePostgresPoolSettings
    & CreateRedisClientAndPublisherSettings
    & StartExpressAppSettings
>

export function getSettings(): Settings {
    const settings = Object.freeze({
        redisHost: process.env.REDIS_HOST as string,
        redisPort: parseInt(process.env.REDIS_PORT as string),
        pgUser: process.env.PG_USER as string,
        pgHost: process.env.PG_HOST as string,
        pgDatabase: process.env.PG_DATABASE as string,
        pgPassword: process.env.PG_PASSWORD as string,
        pgPort: parseInt(process.env.PG_PORT as string),
        serverPort: 5000,
    })
    
    return settings;
}