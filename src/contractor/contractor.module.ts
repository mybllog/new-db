/* eslint-disable prettier/prettier */
// src/Contractors/Contractors.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contractor } from './entities/Contractor.entity';
import { ContractorsController } from './Contractor.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ContractorsService } from './contractor.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Contractor]),
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
  controllers: [ContractorsController],
  providers: [ContractorsService, JwtStrategy],
  exports: [ContractorsService], // Export the service so it can be used in other modules
})
export class ContractorsModule {}