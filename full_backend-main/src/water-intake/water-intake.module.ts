import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterIntake } from './water-intake.entity';
import { WaterIntakeService } from './water-intake.service';
import { WaterIntakeController } from './water-intake.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WaterIntake])],
  providers: [WaterIntakeService],
  controllers: [WaterIntakeController],
})
export class WaterIntakeModule {}
