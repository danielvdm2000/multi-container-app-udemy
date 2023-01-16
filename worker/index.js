import keys from './keys.js'
import redis from 'redis'

const redisClient = redis.createClient({
    socket: {
        host: keys.redisHost,
        port: keys.redisPort,
        reconnectStrategy: () => 1000,
    }
})

await redisClient.connect()
const sub = redisClient.duplicate();
await sub.connect()

function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

sub.subscribe('insert', index => {
    redisClient.hSet('values', index, fib(parseInt(index)))
})