/* eslint-disable prettier/prettier */
// src/clients/clients.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateClientDto } from './dto/register.dto';
import { Client } from './entities/client.entity';
import { ClientLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UpdateClientDto } from './dto/update.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private jwtService: JwtService,
  ) {}

  async register(createClientDto: CreateClientDto) {
    const { email, password } = createClientDto;

    const existingClient = await this.clientRepository.findOne({
      where: { email },
    });
    if (existingClient) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = this.clientRepository.create({
      ...createClientDto,
      role: 'Client',
      password: hashedPassword,
    });

    const savedClient = await this.clientRepository.save(client);

    return {
      statusCode: 201,
      message: 'Client registered successfully',
      data: savedClient,
    };
  }

  async login(loginDto: ClientLoginDto) {
    const { email, password } = loginDto;

    const user = await this.clientRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    const payload = { email: user.email, sub: user.id, role: 'Client' };
    const token = this.jwtService.sign(payload);

    return {
      data: {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phoneNumber,
          address: user.address,
          role: 'Client',
        },
      },
      message: 'Login successful.',
    };
  }

  async findAll() {
    const clients = await this.clientRepository.find();
    return {
      statusCode: 200,
      message: 'Clients fetched successfully',
      data: clients,
    };
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      return {
        statusCode: 404,
        message: 'Client not found',
        data: null,
      };
    }
    return {
      statusCode: 200,
      message: 'Client fetched successfully',
      data: client,
    };
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      return {
        statusCode: 404,
        message: 'Client not found',
        data: null,
      };
    }

    // If the password is being updated, hash it
    if (updateClientDto.password) {
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        10,
      );
    }

    Object.assign(client, updateClientDto);
    const updatedClient = await this.clientRepository.save(client);
    return {
      statusCode: 200,
      message: 'Client updated successfully',
      data: updatedClient,
    };
  }

  async remove(id: number) {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      return {
        statusCode: 404,
        message: 'Client not found',
        data: null,
      };
    }
    await this.clientRepository.remove(client);
    return {
      statusCode: 200,
      message: 'Client deleted successfully',
      data: null,
    };
  }
}
