import { PaymentEntity } from '@Domain/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentRepositoryOrm {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repository: Repository<PaymentEntity>,
  ) {}

  async create(param : PaymentEntity){
    return await this.repository.save(param)
  }

  async update(param : PaymentEntity){
    return await this.repository.save(param)
  }
}
