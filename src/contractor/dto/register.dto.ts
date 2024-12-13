/* eslint-disable prettier/prettier */
// src/contractors/dto/create-contractor.dto.ts
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractorDto {
  @ApiProperty({ example: 'jane.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'Construction Co.' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: '456 Avenue, City, Country' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
