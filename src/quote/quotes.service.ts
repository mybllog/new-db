/* eslint-disable prettier/prettier */
// src/quotes/quotes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(clientId: number, createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new Error('Client not found');
    }
  
    const quote = this.quoteRepository.create({
      ...createQuoteDto,
      client, // Assign the full client entity here
    });
  
    return this.quoteRepository.save(quote);
  }
  
  async findAll() {
    return await this.quoteRepository.find();
  }

  async findOne(id: string) {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) throw new NotFoundException('Quote not found');

    Object.assign(quote, updateQuoteDto);
    return await this.quoteRepository.save(quote);
  }

  async remove(id: string) {
    const quote = await this.findOne(id);
    return await this.quoteRepository.remove(quote);
  }
}
