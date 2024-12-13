/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
// import { JwtAuthGuard } from '';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    schema: {
      example: {
        statusCode: 200,
        message: 'User profile retrieved successfully.',
        data: {
          id: 1,
          email: 'user@example.com',
          name: 'Test User',
          role: 'client',
          createdAt: '2024-12-01T00:00:00.000Z',
        },
      },
    },
  })
  async getProfile(@Req() req: any) {
    const userId = req.user.userId;
    return this.usersService.findProfile(userId);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully.',
    schema: {
      example: {
        statusCode: 200,
        message: 'User profile updated successfully.',
        data: {
          id: 1,
          email: 'updated@example.com',
          name: 'Updated User',
          role: 'client',
          createdAt: '2024-12-01T00:00:00.000Z',
        },
      },
    },
  })
  async updateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user.userId;
    return this.usersService.updateProfile(userId, updateProfileDto);
  }
}
