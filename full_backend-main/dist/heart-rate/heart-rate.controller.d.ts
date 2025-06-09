import { HeartRateService } from './heart-rate.service';
import { HeartRate } from './heart-rate.entity';
export declare class HeartRateController {
    private readonly service;
    constructor(service: HeartRateService);
    add(body: {
        value: number;
    }): Promise<HeartRate>;
    getAll(): Promise<HeartRate[]>;
    getLatest(): Promise<HeartRate>;
    getRecent(): Promise<HeartRate[]>;
}
