import { Controller, Get } from '@nestjs/common';
import { WaterIntakeService } from './water-intake.service';

@Controller('water-intake')
export class WaterIntakeController {
  constructor(private readonly waterService: WaterIntakeService) {}

  @Get('week')
  getLast7Days() {
    return this.waterService.getLast7Days();
  }
}
