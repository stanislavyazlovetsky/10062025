import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WaterIntake } from './water-intake.entity';
import { Repository } from 'typeorm';
import { Between } from 'typeorm';

@Injectable()
export class WaterIntakeService {
  constructor(
    @InjectRepository(WaterIntake)
    private readonly waterRepo: Repository<WaterIntake>,
  ) {}

  async getLast7Days(): Promise<{ date: string; cups: number }[]> {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); // включно з сьогоднішнім днем

    const result = await this.waterRepo.find({
      where: {
        user_id: 1,
        date: Between(sevenDaysAgo, today),
      },
      order: { date: 'ASC' },
    });

    // Повертаємо у зручному вигляді
    return result.map((entry) => ({
  date: new Date(entry.date).toISOString().split('T')[0],
  cups: entry.cups,
}));

  }
}
