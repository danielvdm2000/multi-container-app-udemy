import { Request, Response } from "express";
import { Pool } from "pg";

export function getAllValues(pgPool: Pool) {
    return async (req: Request, res: Response) => {
        try {
            const values = await pgPool.query('SELECT * from values');
        
            res.send(values.rows);
        } catch {
            res.status(500);
        }
    }
}