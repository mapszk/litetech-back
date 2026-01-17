import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [path.join(__dirname, '**', '*.entity.js')],
  migrations: [path.join(__dirname, 'src', 'migrations', '*.js')],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
