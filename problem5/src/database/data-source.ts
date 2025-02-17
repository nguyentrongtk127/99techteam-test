import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env';
import { User } from './entities/user.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  schema: env.DATABASE_SCHEMA,
  entities: [User],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
});

export async function connectDB(retries = 0) {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error(`Error: ${error}`);

    if (!env.DATABASE_RETRIES || retries < env.DATABASE_RETRIES ) {
      console.log(`Retrying in ${env.DATABASE_RETRY_DELAY / 1000} seconds... (${retries + 1}/${env.DATABASE_RETRIES})`);
      setTimeout(() => connectDB(retries + 1), env.DATABASE_RETRY_DELAY);
    } else {
      console.error('Max retries reached. Exiting process.');
      process.exit(1);
    }
  }
}
