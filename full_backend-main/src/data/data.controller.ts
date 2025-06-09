import { Controller, Post, Body } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { DataService } from './data.service';

@Controller('api/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  receiveData(@Body() body: CreateDataDto) {
    return this.dataService.saveData(body);
  }
}