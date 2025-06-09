import { CreateDataDto } from './dto/create-data.dto';
import { DataService } from './data.service';
export declare class DataController {
    private readonly dataService;
    constructor(dataService: DataService);
    receiveData(body: CreateDataDto): Promise<{
        message: string;
    }>;
}
