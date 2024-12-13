/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth('Authorization')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('contractor/:id')
  @ApiOperation({ summary: 'Get all orders for a contractor' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No orders found' })
  async findByContractor(@Param('id') contractorId: number) {
    return {
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: await this.ordersService.findByContractor(contractorId),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/client')
  @ApiOperation({ summary: 'Get all orders for a client' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getClientOrders(@Request() req: any) {
    const clientId = req.user.userId;
    const orders = await this.ordersService.findByClient(clientId);
    return {
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/client/:id')
  @ApiOperation({ summary: 'Get order details for a client' })
  @ApiResponse({
    status: 200,
    description: 'Order details retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderDetails(@Param('id') id: number, @Request() req: any) {
    const clientId = req.user.userId;
    const order = await this.ordersService.findByIdForClient(id, clientId);
    return {
      statusCode: 200,
      message: 'Order details retrieved successfully',
      data: order,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update order status (for contractor)' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req: any,
  ) {
    const contractorId = req.user.userId; // Assuming contractors update orders
    const updatedOrder = await this.ordersService.updateStatus(
      id,
      contractorId,
      updateOrderDto,
    );
    return {
      statusCode: 200,
      message: 'Order updated successfully',
      data: updatedOrder,
    };
  }
}
