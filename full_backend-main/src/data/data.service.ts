import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PulseData } from './entities/pulse_data.entity';
import { OxygenData } from './entities/oxygen_data.entity';

import { CreateDataDto } from './dto/create-data.dto';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(PulseData)
    private pulseRepo: Repository<PulseData>,

    @InjectRepository(OxygenData)
    private spo2Repo: Repository<OxygenData>,
  ) {}

  async saveData(data: CreateDataDto) {
    const pulse = this.pulseRepo.create({
      customer_id: data.customer_id, // додано
      pulse: data.bpm,              // Замість bpm → pulse
    });

    const spo2 = this.spo2Repo.create({
      customer_id: data.customer_id, // додано
      oxygenLevel: data.spo2,         // Замість spo2 → oxygenLevel
    });

    await this.pulseRepo.save(pulse);
    await this.spo2Repo.save(spo2);

    return { message: '✅ Saved to both tables' };
  }
}
