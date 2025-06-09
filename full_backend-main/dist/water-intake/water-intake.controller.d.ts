import { WaterIntakeService } from './water-intake.service';
export declare class WaterIntakeController {
    private readonly waterService;
    constructor(waterService: WaterIntakeService);
    getLast7Days(): Promise<{
        date: string;
        cups: number;
    }[]>;
}
