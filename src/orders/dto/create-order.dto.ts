/* eslint-disable prettier/prettier */
// src/orders/dto/create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The quote ID associated with the order.',
    example: 987,
  })
  @IsNumber()
  quoteId: number;

  @ApiProperty({
    description: 'The start date of the order.',
    example: '2024-11-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'The end date of the order.',
    example: '2024-11-10',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'The total amount for the order.',
    example: 500.75,
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    description: 'An optional description of the order.',
    example: 'Special request for order delivery.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
