import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { PulseData } from './entities/pulse_data.entity';
import { OxygenData } from './entities/oxygen_data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PulseData, OxygenData])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}