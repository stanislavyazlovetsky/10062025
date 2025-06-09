import { Controller, Post, Get, Body } from '@nestjs/common';
import { BloodOxygenService } from './blood-oxygen.service';
import { BloodOxygen } from './blood-oxygen.entity';

@Controller('blood-oxygen')
export class BloodOxygenController {
  constructor(private service: BloodOxygenService) {}

  @Post('add')
  add(@Body() body: { value: number }): Promise<BloodOxygen> {
    return this.service.create(body.value);
  }

  @Get('all')
  getAll(): Promise<BloodOxygen[]> {
    return this.service.findAll();
  }

  @Get('latest')
  getLatest(): Promise<BloodOxygen> {
    return this.service.findLatest();
  }


  @Get('recent')
getRecent(): Promise<BloodOxygen[]> {
  return this.service.findRecent();
}

}
