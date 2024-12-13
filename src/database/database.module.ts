/* eslint-disable prettier/prettier */
// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Contractor } from 'src/contractor/entities/contractor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true, // Set to false in production
        entities: [Contractor, __dirname + '/../**/*.entity{.ts,.js}'],
        migrations: ['./migrations/*.ts'],
  // synchronize: false,
        logging: true, // Enable query logging (optional)
      }),
    }),
  ],
})
export class DatabaseModule {}
