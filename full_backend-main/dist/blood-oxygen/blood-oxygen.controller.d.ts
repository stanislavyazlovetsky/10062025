import { BloodOxygenService } from './blood-oxygen.service';
import { BloodOxygen } from './blood-oxygen.entity';
export declare class BloodOxygenController {
    private service;
    constructor(service: BloodOxygenService);
    add(body: {
        value: number;
    }): Promise<BloodOxygen>;
    getAll(): Promise<BloodOxygen[]>;
    getLatest(): Promise<BloodOxygen>;
    getRecent(): Promise<BloodOxygen[]>;
}
