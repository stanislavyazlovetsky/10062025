import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodOxygen } from './blood-oxygen.entity';

@Injectable()
export class BloodOxygenService {
  constructor(
    @InjectRepository(BloodOxygen)
    private repo: Repository<BloodOxygen>,
  ) {}

  create(value: number): Promise<BloodOxygen> {
  const entry = this.repo.create({
    oxygen_level: value,  // ключ відповідає полю в таблиці
    customer_id: 1,       // жорстко задаємо
  });
  return this.repo.save(entry);
}

  findAll(): Promise<BloodOxygen[]> {
    return this.repo.find();
  }

  findLatest(): Promise<BloodOxygen> {
    return this.repo.findOne({
      where: {}, // обов'язковий ключ
      order: { id: 'DESC' }, // останній запис
    });
  }

  async findRecent(limit = 50): Promise<BloodOxygen[]> {
  return this.repo.find({
    order: { recorded_at: 'DESC' },
    take: limit,
  });
}


}
