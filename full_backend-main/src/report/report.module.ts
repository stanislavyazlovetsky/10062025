// report.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ProfileSettings } from '../profile-settings/profile-settings.entity';
import { HeartRate } from '../heart-rate/heart-rate.entity';
import { BloodOxygen } from '../blood-oxygen/blood-oxygen.entity';
import { WaterIntake } from '../water-intake/water-intake.entity';
import { FallEvent } from '../fall-events/fall-events.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileSettings,
      HeartRate,
      BloodOxygen,
      WaterIntake,
      FallEvent,
    ]),
  ],
  controllers: [ReportController], // ← ОБОВ’ЯЗКОВО
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}