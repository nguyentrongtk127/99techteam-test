import express from 'express';
import allRoutes from './routes/index';
import { connectDB } from './database/data-source';

export async function createApp() {
    await connectDB()
    const app = express();
    //middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', allRoutes);
      
    return app;
}