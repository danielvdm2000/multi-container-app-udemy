import express from 'express';
import { createExpressApp } from '../create-express-app';

describe('createExpressApp', () => {
    let app: ReturnType<typeof express>;

    beforeEach(() => {
        app = createExpressApp();
    });

    test('should create an instance of express', () => {
        expect(app).toBeDefined();
    });

    test('should use cors middleware', () => {
        expect(app._router.stack.some((r: any) => r.name === 'corsMiddleware')).toBe(true);
    });

    test('should use body-parser middleware', () => {
        expect(app._router.stack.some((r: any) => r.name === 'jsonParser')).toBe(true);
    });
});