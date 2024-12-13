/* eslint-disable prettier/prettier */
// src/reports/reports.controller.ts
import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../common/guards/jwt.guard'; // Import the JWT Auth Guard
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Reports') // Swagger tag to categorize the endpoints
@Controller('reports')
@ApiBearerAuth()  // Swagger decorator to specify the bearer token authentication
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @ApiOperation({ summary: 'Generate a new report' }) // Swagger description for the operation
  @ApiResponse({
    status: 201,
    description: 'The report has been successfully generated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data.',
  })
  async generateReport(@Body() reportDetails: any) {
    return await this.reportsService.generateReport(reportDetails);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @ApiOperation({ summary: 'Get a report by ID' }) // Swagger description for the operation
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully fetched.',
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found.',
  })
  async getReport(@Param('id') id: number) {
    return await this.reportsService.getReport(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @ApiOperation({ summary: 'Get all reports' }) // Swagger description for the operation
  @ApiResponse({
    status: 200,
    description: 'List of all reports.',
  })
  async getAllReports() {
    return await this.reportsService.getAllReports();
  }
}
