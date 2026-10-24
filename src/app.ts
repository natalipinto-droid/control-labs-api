import express, { Request, Response } from 'express';
import cors from 'cors';

import { globalErrorHandler } from './middlewares/errorHandler.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import apiRouter from './routes';

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(express.json());


// Health Check Endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'ControlLabs API operando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1', apiRouter)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada.' });
});

app.use(globalErrorHandler);

export default app;