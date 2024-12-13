/* eslint-disable prettier/prettier */
// src/bills/dto/update-bill.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateBillDto {
  @ApiProperty({
    description: 'The status of the bill.',
    example: 'paid',
    enum: ['unpaid', 'paid', 'overdue'],
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: 'unpaid' | 'paid' | 'overdue';

  @ApiProperty({
    description: 'An optional description of the bill update.',
    example: 'Payment received.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
