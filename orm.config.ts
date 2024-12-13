/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Contractor } from './src/contractor/entities/contractor.entity'; // Update with your actual entity imports
import { Client } from './src/client/entities/client.entity';
import { Quote } from './src/quote/entities/quote.entity';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'mySQL@2024',
  database: process.env.DB_NAME || 'driveway_service',
  entities: [Contractor, Client, Quote], // Add all your entities here
  migrations: ['./migrations/*.ts'],
  synchronize: false, // Disable sync for production; use migrations
  logging: true,
});
