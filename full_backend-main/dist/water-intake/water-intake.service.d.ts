import { WaterIntake } from './water-intake.entity';
import { Repository } from 'typeorm';
export declare class WaterIntakeService {
    private readonly waterRepo;
    constructor(waterRepo: Repository<WaterIntake>);
    getLast7Days(): Promise<{
        date: string;
        cups: number;
    }[]>;
}
