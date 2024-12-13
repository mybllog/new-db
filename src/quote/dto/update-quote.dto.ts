/* eslint-disable prettier/prettier */
// src/quotes/dto/update-quote.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum, IsPositive } from 'class-validator';

export class UpdateQuoteDto {
  @ApiProperty({
    description: 'The status of the quote.',
    example: 'accepted',
    enum: ['pending', 'accepted', 'rejected'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(['pending', 'accepted', 'rejected'])
  status?: 'pending' | 'accepted' | 'rejected';

  @ApiProperty({
    description: 'Updated property details for the quote.',
    example: 'Updated details about the property.',
    required: false,
  })
  @IsString()
  @IsOptional()
  propertyDetails?: string;

  @ApiProperty({
    description: 'Updated property details for the quote.',
    example: 'Updated details about the property.',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;

  @ApiProperty({
    description: 'Additional notes for the quote update.',
    example: 'Updated terms and conditions.',
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalNotes?: string;

  @ApiProperty({
    description: 'An optional description of the quote update.',
    example: 'Modified quote details.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
