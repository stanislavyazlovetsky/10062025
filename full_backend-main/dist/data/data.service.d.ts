import { Repository } from 'typeorm';
import { PulseData } from './entities/pulse_data.entity';
import { OxygenData } from './entities/oxygen_data.entity';
import { CreateDataDto } from './dto/create-data.dto';
export declare class DataService {
    private pulseRepo;
    private spo2Repo;
    constructor(pulseRepo: Repository<PulseData>, spo2Repo: Repository<OxygenData>);
    saveData(data: CreateDataDto): Promise<{
        message: string;
    }>;
}
