import { getAllValues } from '../get-all-values';
import { Pool } from "pg";
import { Request, Response } from 'express'

describe('getAllValues', () => {
    let req: Request;
    let res: Response;
    let mockPgPool: Pool;
    
    beforeEach(() => {
        req = {} as any as Request;
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as any as Response;
        mockPgPool = {
            query: jest.fn()
        } as any as Pool;
        
    });

    test('should select all values from postgres and return them', async () => {
        const mockValues = { rows: [{ id: 1, number: 2 }, { id: 2, number: 3 }] };
        (mockPgPool.query as jest.Mock<any, any>).mockResolvedValue(mockValues);

        await getAllValues(mockPgPool)(req, res);

        expect(mockPgPool.query).toHaveBeenCalledWith('SELECT * from values');
        expect(res.send).toHaveBeenCalledWith(mockValues.rows);
    });

    test('should return 500 status code if it fails to select values', async () => {
        (mockPgPool.query as jest.Mock<any, any>).mockRejectedValue(new Error());

        await getAllValues(mockPgPool)(req, res);

        expect(mockPgPool.query).toHaveBeenCalledWith('SELECT * from values');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).not.toHaveBeenCalled();
    });
});