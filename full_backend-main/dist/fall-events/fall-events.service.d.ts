import { Repository } from 'typeorm';
import { FallEvent } from './fall-events.entity';
export declare class FallEventsService {
    private fallEventsRepository;
    constructor(fallEventsRepository: Repository<FallEvent>);
    findFallsInPeriod(startDate: Date, endDate: Date): Promise<FallEvent[]>;
}
