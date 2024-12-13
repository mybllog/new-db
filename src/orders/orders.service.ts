/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Find all orders for a client
  async findByClient(clientId: number) {
    return await this.orderRepository.find({
      where: { client: { id: clientId } }, // Use nested object for `client`
      relations: ['client'], // Include related `client` entity
    });
  }

  async findByContractor(contractorId: number) {
    return await this.orderRepository.find({
      where: { contractor: { id: contractorId } }, // Use nested object for `contractor`
      relations: ['contractor'], // Include related `contractor` entity
    });
  }
  
  async findByIdForContractor(id: number, contractorId: number) {
    const order = await this.orderRepository.findOne({
      where: { id, contractor: { id: contractorId } },
      relations: ['contractor'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  
  // Find order details for a client
  async findByIdForClient(id: number, clientId: number) {
    const order = await this.orderRepository.findOne({
      where: { id, client: { id: clientId } },
      relations: ['client'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // Update order status
  async updateStatus(id: number, contractorId: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id, contractor: { id: contractorId } },
      relations: ['contractor'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }
}
