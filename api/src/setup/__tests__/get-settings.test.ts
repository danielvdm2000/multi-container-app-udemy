import { getSettings } from '../get-settings';

describe('getSettings', () => {
    let originalEnv: any;
    beforeEach(() => {
        originalEnv = process.env;
        process.env = {
            ...process.env,
            REDIS_HOST: 'localhost',
            REDIS_PORT: '6379',
            PG_USER: 'testuser',
            PG_HOST: 'localhost',
            PG_DATABASE: 'testdb',
            PG_PASSWORD: 'testpassword',
            PG_PORT: '5432'
        };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    test('returns an object containing settings properties', () => {
        const settings = getSettings();
        expect(settings.redisHost).toBeTruthy();
        expect(settings.redisPort).toBeTruthy();
        expect(settings.pgUser).toBeTruthy();
        expect(settings.pgHost).toBeTruthy();
        expect(settings.pgDatabase).toBeTruthy();
        expect(settings.pgPassword).toBeTruthy();
        expect(settings.pgPort).toBeTruthy();
        expect(settings.serverPort).toBeTruthy();
    });

    test('returns an object containing correct settings properties', () => {
        const settings = getSettings();
        expect(settings.redisHost).toBe("localhost");
        expect(settings.redisPort).toBe(6379);
        expect(settings.pgUser).toBe("testuser");
        expect(settings.pgHost).toBe("localhost");
        expect(settings.pgDatabase).toBe("testdb");
        expect(settings.pgPassword).toBe("testpassword");
        expect(settings.pgPort).toBe(5432);
        expect(settings.serverPort).toBe(5000);
    });
});
