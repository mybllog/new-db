/* eslint-disable prettier/prettier */
// src/orders/dto/update-order.dto.ts
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({ description: 'Status of the order', example: 'in-progress' })
  @IsString()
  @IsOptional()
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

  @ApiProperty({ description: 'Additional comments or notes', example: 'Work started today' })
  @IsString()
  @IsOptional()
  comments?: string;
}
