import { Repository } from 'typeorm';
import { HeartRate } from './heart-rate.entity';
export declare class HeartRateService {
    private readonly repo;
    constructor(repo: Repository<HeartRate>);
    create(value: number): Promise<HeartRate>;
    findAll(): Promise<HeartRate[]>;
    findLatest(): Promise<HeartRate>;
    findRecent(limit?: number): Promise<HeartRate[]>;
}
