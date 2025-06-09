import { Controller, Get, Post, Body } from '@nestjs/common';
import { HeartRateService } from './heart-rate.service';
import { HeartRate } from './heart-rate.entity';

@Controller('heart-rate')
export class HeartRateController {
  constructor(private readonly service: HeartRateService) {}

  @Post('add')
  add(@Body() body: { value: number }): Promise<HeartRate> {
    return this.service.create(body.value);
  }

  @Get('all')
  getAll(): Promise<HeartRate[]> {
    return this.service.findAll();
  }

  @Get('latest')
  getLatest(): Promise<HeartRate> {
    return this.service.findLatest();
  }

  @Get('recent')
getRecent(): Promise<HeartRate[]> {
  return this.service.findRecent();
}



}
