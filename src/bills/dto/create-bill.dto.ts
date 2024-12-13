/* eslint-disable prettier/prettier */
// src/bills/dto/create-bill.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateBillDto {
  @ApiProperty({
    description: 'The order ID associated with the bill.',
    example: 123,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'The amount of the bill.',
    example: 150.5,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'The due date for the bill.',
    example: '2024-12-31',
  })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    description: 'An optional description of the bill.',
    example: 'For services rendered in December',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
