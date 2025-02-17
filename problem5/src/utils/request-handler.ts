import { Request, Response, NextFunction } from 'express';

export const handleRequest =
  (handler: (req: Request) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await handler(req);
      res.json({ success: true, data });
    } catch (error: any) {

      const statusCode = error.statusCode || 500
      res.status(statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors || null,
      });
    }
  };