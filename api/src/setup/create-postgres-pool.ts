import { Pool } from 'pg';

export type CreatePostgresPoolSettings = Readonly<{
    pgUser: string,
    pgHost: string,
    pgDatabase: string,
    pgPassword: string,
    pgPort: number,
}>

export function createPostgresPool(settings: CreatePostgresPoolSettings): Pool {
    const pgPool = new Pool({
        user: settings.pgUser,
        host: settings.pgHost,
        database: settings.pgDatabase,
        password: settings.pgPassword,
        port: settings.pgPort,
    });
    
    pgPool.query("CREATE TABLE IF NOT EXISTS values (number INT)");

    return pgPool;
}