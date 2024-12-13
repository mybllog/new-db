/* eslint-disable prettier/prettier */
// src/reports/reports.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ReportsService {
  private reports = [];

  // Generate a new report
  async generateReport(reportDetails: any) {
    const newReport = {
      id: this.reports.length + 1,
      ...reportDetails,
      createdAt: new Date(),
    };
    this.reports.push(newReport);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Report generated successfully',
      data: newReport,
    };
  }

  // Get a single report by ID
  async getReport(id: number) {
    const report = this.reports.find((report) => report.id === id);
    if (!report) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Report not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Report retrieved successfully',
      data: report,
    };
  }

  // Get all reports
  async getAllReports() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Reports retrieved successfully',
      data: this.reports,
    };
  }
}
