/* eslint-disable prettier/prettier */
// src/contractors/contractors.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateContractorDto } from './dto/register.dto';
import { Contractor } from './entities/contractor.entity';
import { ContractorLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UpdateContractorDto } from './dto/update.dto';

@Injectable()
export class ContractorsService {
  constructor(
    @InjectRepository(Contractor)
    private readonly contractorRepository: Repository<Contractor>,
    private jwtService: JwtService,
  ) {}

  async register(createContractorDto: CreateContractorDto) {
    const { email, password } = createContractorDto;

    const existingContractor = await this.contractorRepository.findOne({
      where: { email },
    });
    if (existingContractor) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const contractor = this.contractorRepository.create({
      ...createContractorDto,
      role: 'Contractor',
      password: hashedPassword,
    });

    const savedContractor = await this.contractorRepository.save(contractor);
    return {
      statusCode: 201,
      message: 'Contractor registered successfully',
      data: savedContractor,
    };
  }

  async login(loginDto: ContractorLoginDto) {
    const { email, password } = loginDto;

    const user = await this.contractorRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    const payload = { email: user.email, sub: user.id, role: 'Contractor' };
    const token = this.jwtService.sign(payload);

    return {
      data: {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'Contractor',
          company: user.company,
          address: user.address,
          phone: user.phoneNumber,
        },
      },
      message: 'Login successful.',
    };
  }

  async findAll() {
    const contractor = await this.contractorRepository.find();
    return {
      statusCode: 200,
      message: 'Contractors fetched successfully',
      data: contractor,
    };
  }

  async findOne(id: number) {
    const contractor = await this.contractorRepository.findOne({
      where: { id },
    });
    if (!contractor) {
      return {
        statusCode: 404,
        message: 'Contractor not found',
        data: null,
      };
    }
    return {
      statusCode: 200,
      message: 'Contractor fetched successfully',
      data: contractor,
    };
  }

  async update(id: number, updateContractorDto: UpdateContractorDto) {
    const contractor = await this.contractorRepository.findOne({
      where: { id },
    });
    if (!contractor) {
      return {
        statusCode: 404,
        message: 'Contractor not found',
        data: null,
      };
    }

    // If the password is being updated, hash it
    if (updateContractorDto.password) {
      updateContractorDto.password = await bcrypt.hash(
        updateContractorDto.password,
        10,
      );
    }

    Object.assign(contractor, updateContractorDto);
    const updatedContractor = await this.contractorRepository.save(contractor);
    return {
      statusCode: 200,
      message: 'Contractor updated successfully',
      data: updatedContractor,
    };
  }

  async remove(id: number) {
    const contractor = await this.contractorRepository.findOne({
      where: { id },
    });
    if (!contractor) {
      return {
        statusCode: 404,
        message: 'Contractor not found',
        data: null,
      };
    }
    await this.contractorRepository.remove(contractor);
    return {
      statusCode: 200,
      message: 'Contractor deleted successfully',
      data: null,
    };
  }
}
