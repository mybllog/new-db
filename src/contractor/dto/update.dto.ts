/* eslint-disable prettier/prettier */
// src/contractor/dto/update-contractor.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateContractorDto {
  @IsString()
  @IsOptional()
  name?: string;

//   @IsString()
//   @IsOptional()
//   email?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}