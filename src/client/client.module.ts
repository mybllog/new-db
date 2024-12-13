/* eslint-disable prettier/prettier */
// src/clients/clients.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './client.service';
import { Client } from './entities/client.entity';
import { ClientsController } from './client.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Client]),
  PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for dependency injection
      inject: [ConfigService], // Inject ConfigService
      useFactory: async () => ({
        secret: process.env.JWT_KEY, // Use ConfigService for JWT secret
        signOptions: { expiresIn: '1h' }, // Set JWT expiration
      }),
    }),
],
  controllers: [ClientsController],
  providers: [ClientsService, JwtStrategy],
  exports: [ClientsService], // Export the service so it can be used in other modules
})
export class ClientsModule {}
