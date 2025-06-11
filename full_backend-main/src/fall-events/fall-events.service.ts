import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { FallEvent } from './fall-events.entity';

@Injectable()
export class FallEventsService {
  constructor(
    @InjectRepository(FallEvent)
    private fallEventsRepository: Repository<FallEvent>,
  ) {}

  async findFallsInPeriod(startDate: Date, endDate: Date): Promise<FallEvent[]> {
    return this.fallEventsRepository.find({
      where: {
        detected_at: Between(startDate, endDate),
      },
      order: { detected_at: 'ASC' },
    });
  }
}
