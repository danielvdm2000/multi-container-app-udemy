import keys from './keys.js';
import express from 'express';
import cors from 'cors';
import redis from 'redis';
import pg from 'pg';
import bodyparser from 'body-parser';

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyparser.json());

// Postgress Client Setup
const pgPool = new pg.Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

pgPool.query("CREATE TABLE IF NOT EXISTS values (number INT)");

// Redis Client Setup
const redisClient = redis.createClient({
    socket: {
        host: keys.redisHost,
        port: keys.redisPort,
        reconnectStrategy: () => 1000,
    },
});
await redisClient.connect();
const redisPublisher = redisClient.duplicate();
await redisPublisher.connect();

// Express route handlers
app.get('/', (req, res) => {
    res.send('HI');
});

app.get('/values/all', async (req, res) =>  {
    const values = await pgPool.query('SELECT * from values');

    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    const values = await redisClient.hGetAll('values')
    res.send(values);
});

app.post('/values', async (req, res) => {
    const index = req.body.index;

    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high');
    }

    redisClient.hSet('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    pgPool.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ working: true });
});

app.listen(5000, () => {
    console.log('Listening on port 5000')
})