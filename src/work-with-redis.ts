import redis from 'redis';

const client = redis.createClient({
    url: 'redis://localhost:6379', 
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

async function manageRedis(): Promise<void> {
    try {
        await client.connect();

        await client.set('user:1', 'Alice');
        await client.set('user:2', 'Bob');
        await client.set('user:3', 'Charlie');

        console.log('Keys saved successfully');

        const user2 = await client.get('user:2');
        console.log('Value for user:2:', user2); 

        const user1 = await client.get('user:1');
        console.log('Value for user:1:', user1); 

        const user3 = await client.get('user:3');
        console.log('Value for user:3:', user3); 

    } catch (err) {
        console.error('Error in managing Redis:', err);
    } finally {
        await client.quit();
        console.log('Disconnected from Redis');
    }
}

module.exports = { manageRedis };
