import { Controller, Get, Query } from '@nestjs/common';
import { FallEventsService } from './fall-events.service';

@Controller('fall-events')
export class FallEventsController {
  constructor(private readonly fallEventsService: FallEventsService) {}

  @Get('week')
  async getFallsLastWeek() {
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0); // сьогодні опівночі
    endDate.setDate(endDate.getDate() - 1); // вчора

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);

    return this.fallEventsService.findFallsInPeriod(startDate, endDate);
  }
}
