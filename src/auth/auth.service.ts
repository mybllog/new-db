/* eslint-disable prettier/prettier */
// src/auth/auth.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  // Register a new user (client or contractor)
  async register(registerDto: RegisterDto) {
    const { email, password, name, role } = registerDto;

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Email already exists',
          data: null,
        },
        HttpStatus.CONFLICT,
      );
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
        role: savedUser.role,
      },
    };
  }

  // Login Method
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
          data: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Generate JWT Token
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Return user info along with token
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    };
  }
}
