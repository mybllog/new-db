/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { BillsModule } from './bills/bills.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { QuotesModule } from './quote/quotes.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './client/client.module';
import { ContractorsModule } from './contractor/contractor.module';
import { JwtAuthGuard } from './common/guards/jwt.guard';
//import { Contractor } from './contractor/entities/contractor.entity';
import { DataSource } from 'typeorm';
import {  OnModuleInit } from '@nestjs/common';
@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Adaeze34567890',
      database: 'driveway_service',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //entities: [Contractor],
      synchronize: true,
    }),
    DatabaseModule, // Add the DatabaseModule here
    // AuthModule,
    ClientsModule,
    ContractorsModule,
    UsersModule,
    QuotesModule,
    OrdersModule,
    BillsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})

export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  onModuleInit() {
    // Log all registered entities using DataSource
    console.log(
      this.dataSource.entityMetadatas.map(meta => meta.name)
    );
  }
}
