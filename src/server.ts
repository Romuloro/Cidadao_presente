import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import { AppError } from './errors/AppError';

export const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return resp.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return resp.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3003, () =>
  console.log('Server is running in http://localhost:3003')
);