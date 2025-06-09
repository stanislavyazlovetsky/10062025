import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeartRate } from './heart-rate.entity';

@Injectable()
export class HeartRateService {
  constructor(
    @InjectRepository(HeartRate)
    private readonly repo: Repository<HeartRate>,
  ) {}

  async create(value: number): Promise<HeartRate> {
    const entry = this.repo.create({
    pulse: value, 
    customer_id: 1, // 🧷 жорстко задаємо
  });
    return await this.repo.save(entry);
  }

  async findAll(): Promise<HeartRate[]> {
    return await this.repo.find();
  }

  async findLatest(): Promise<HeartRate> {
  return await this.repo.findOne({
    where: {},
    order: { id: 'DESC' },
  });
}

async findRecent(limit = 50): Promise<HeartRate[]> {
  return this.repo.find({
    order: { recorded_at: 'DESC' },
    take: limit,
  });
}


}
