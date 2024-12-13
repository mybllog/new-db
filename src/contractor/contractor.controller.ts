/* eslint-disable prettier/prettier */
// src/contractors/contractors.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContractorsService } from './contractor.service';
import { CreateContractorDto } from './dto/register.dto';
import { ContractorLoginDto } from './dto/login.dto';
import { UpdateContractorDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@ApiTags('contractors')
@Controller('mesh/api/contractors')
@Controller('contractors')
export class ContractorsController {
  constructor(private readonly contractorsService: ContractorsService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new contractor' })
  @ApiResponse({ status: 201, description: 'Contractor registered successfully' })
  @ApiResponse({ status: 409, description: 'Email is already in use' })
  async register(@Body() createContractorDto: CreateContractorDto) {
    return this.contractorsService.register(createContractorDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a contractor' })
  @ApiResponse({ status: 200, description: 'Contractor logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: ContractorLoginDto) {
    return this.contractorsService.login(loginDto);
  }

  @Get()
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all contractors' })
  @ApiResponse({ status: 200, description: 'Contractors fetched successfully' })
  @ApiResponse({ status: 404, description: 'Contractor not found' })
  async findAll() {
    return this.contractorsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a single contractors' })
  @ApiResponse({ status: 200, description: 'Contractors fetched successfully' })
  @ApiResponse({ status: 404, description: 'Contractor not found' })
  async findOne(@Param('id') id: number) {
    return this.contractorsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a contractor' })
  @ApiResponse({ status: 200, description: 'Contractor updated successfully' })
  @ApiResponse({ status: 404, description: 'Contractor not found' })
  async update(@Param('id') id: number, @Body() updateContractorDto: UpdateContractorDto) {
    return this.contractorsService.update(id, updateContractorDto);
  }

  @Delete(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a contractor' })
  @ApiResponse({ status: 200, description: 'Contractor deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contractor not found' })
  async remove(@Param('id') id: number) {
    return this.contractorsService.remove(id);
  }
}
