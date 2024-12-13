/* eslint-disable prettier/prettier */
// src/bills/bills.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';  // Import the guard
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';  // Import Swagger decorators

@ApiTags('Bills')
@Controller('bills')
@ApiBearerAuth()  // Add this line to enable Bearer token authentication
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Create a new bill' })
  @ApiResponse({
    status: 201,
    description: 'The bill has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data.',
  })
  async create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Get all bills' })
  @ApiResponse({
    status: 200,
    description: 'List of all bills.',
  })
  async findAll() {
    return this.billsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Get a bill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bill has been successfully fetched.',
  })
  async findOne(@Param('id') id: number) {
    return this.billsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Update a bill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bill has been successfully updated.',
  })
  async update(@Param('id') id: number, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(id, updateBillDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)  // Protect the route
  @ApiOperation({ summary: 'Delete a bill by ID' })
  @ApiResponse({
    status: 200,
    description: 'The bill has been successfully deleted.',
  })
  async remove(@Param('id') id: number) {
    return this.billsService.remove(id);
  }
}
