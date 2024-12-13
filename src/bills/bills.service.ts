/* eslint-disable prettier/prettier */
// src/bills/bills.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  // Create a new bill
  async create(createBillDto: CreateBillDto) {
    const bill = this.billRepository.create(createBillDto);
    const savedBill = await this.billRepository.save(bill);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Bill created successfully',
      data: savedBill,
    };
  }

  // Get all bills
  async findAll() {
    const bills = await this.billRepository.find();
    return {
      statusCode: HttpStatus.OK,
      message: 'Bills retrieved successfully',
      data: bills,
    };
  }

  // Get a single bill by ID
  async findOne(id: number) {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Bill not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Bill retrieved successfully',
      data: bill,
    };
  }

  // Update a bill's status
  async update(id: number, updateBillDto: UpdateBillDto) {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Bill not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(bill, updateBillDto);
    const updatedBill = await this.billRepository.save(bill);
    return {
      statusCode: HttpStatus.OK,
      message: 'Bill updated successfully',
      data: updatedBill,
    };
  }

  // Delete a bill
  async remove(id: number) {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Bill not found',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.billRepository.remove(bill);
    return {
      statusCode: HttpStatus.OK,
      message: 'Bill deleted successfully',
      data: null,
    };
  }
}
