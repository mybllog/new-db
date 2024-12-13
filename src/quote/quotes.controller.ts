/* eslint-disable prettier/prettier */
// src/quotes/quotes.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@ApiTags('Quotes')
@Controller('mesh/api/quotes')
@ApiBearerAuth()
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Submit a new quote' })
  @ApiResponse({ status: 201, description: 'Quote submitted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createQuoteDto: CreateQuoteDto, @Req() req: any) {
    const clientId = req.user?.userId; // Validate `req.user` exists
    if (!clientId) {
      throw new Error('Client ID is missing');
    }
    const quote = await this.quotesService.create(clientId, createQuoteDto);
  
    return {
      statusCode: 201,
      message: 'Quote created successfully',
      data: quote,
    };
  }
  

  @Get()
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all quotes' })
  @ApiResponse({ status: 200, description: 'Retrieve all quotes' })
  async findAll() {
    return {
      statusCode: 200,
      message: 'All quotes retrieved successfully',
      data: await this.quotesService.findAll(),
    };
  }

  @Get(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get quote by ID' })
  @ApiResponse({ status: 200, description: 'Quote retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  async findOne(@Param('id') id: string) {
    return {
      statusCode: 200,
      message: 'Quote retrieved successfully',
      data: await this.quotesService.findOne(id),
    };
  }

  @Patch(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update quote' })
  @ApiResponse({ status: 200, description: 'Quote updated successfully' })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  async update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return {
      statusCode: 200,
      message: 'Quote updated successfully',
      data: await this.quotesService.update(id, updateQuoteDto),
    };
  }

  @Delete(':id')
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete quote' })
  @ApiResponse({ status: 200, description: 'Quote deleted successfully' })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  async remove(@Param('id') id: string) {
    await this.quotesService.remove(id);
    return {
      statusCode: 200,
      message: 'Quote deleted successfully',
      data: null,
    };
  }
}
