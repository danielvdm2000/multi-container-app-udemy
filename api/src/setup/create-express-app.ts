import express, { Express } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';

export function createExpressApp(): Express {
    const app = express();
    app.use(cors());
    app.use(bodyparser.json());

    return app;
}