import { createPostgresPool } from '../create-postgres-pool';
import { Pool } from 'pg';

jest.mock('pg', () => {
    const mockPool = jest.fn(() => ({
        query: jest.fn().mockResolvedValue({ rows: [] }),
    }));
    return { Pool: mockPool };
});

describe('createPostgresPool', () => {
    let pgPool: Pool;
    const mockSettings = {
        pgUser: 'testuser',
        pgHost: 'localhost',
        pgDatabase: 'testdb',
        pgPassword: 'testpassword',
        pgPort: 5432,
    };

    beforeEach(() => {
        pgPool = createPostgresPool(mockSettings);
    });

    test('returns a pg Pool instance', () => {
        expect(pgPool).toBeTruthy();
        expect(pgPool.query).toBeTruthy();
    });

    test('invokes pgPool.query', () => {
        expect(pgPool.query).toHaveBeenCalled();
    });
});