import { cleanEnv, num, str } from 'envalid';
import * as dotenv from 'dotenv';
dotenv.config();

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['dev', 'prod', 'test'] }),
    PORT: num({ default: 3008 }),
    DATABASE_URL: str(),
    DATABASE_SCHEMA: str(),
    DATABASE_RETRIES: num({ default: Infinity }),
    DATABASE_RETRY_DELAY: num({ default: 3000 }),
});