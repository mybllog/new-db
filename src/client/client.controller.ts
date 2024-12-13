/* eslint-disable prettier/prettier */
// src/clients/clients.controller.ts
import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientsService } from './client.service';
import { CreateClientDto } from './dto/register.dto';
import { ClientLoginDto } from './dto/login.dto';
import { UpdateClientDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@ApiTags('clients')
@Controller('mesh/api/clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new client' })
  @ApiResponse({ status: 201, description: 'Client registered successfully' })
  @ApiResponse({ status: 409, description: 'Email is already in use' })
  async register(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.register(createClientDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a client' })
  @ApiResponse({ status: 200, description: 'Client logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: ClientLoginDto) {
    return this.clientsService.login(loginDto);
  }

  // @Post('logout')
  // @ApiOperation({ summary: 'Logout a client' })
  // @ApiResponse({ status: 200, description: 'Client logged out successfully' })
  // @ApiResponse({ status: 401, description: 'Invalid credentials' })
  // async logout(@Body() loginDto: ClientLoginDto) {
  //   return this.clientsService.logout(loginDto);
  // }

  @Get()
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Clients fetched successfully' })
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a single client' })
  @ApiResponse({ status: 200, description: 'Client fetched successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(@Param('id') id: number) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({ status: 200, description: 'Client deleted successfully' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async remove(@Param('id') id: number) {
    return this.clientsService.remove(id);
  }
}
