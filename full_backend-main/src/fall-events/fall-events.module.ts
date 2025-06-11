import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FallEvent } from './fall-events.entity';
import { FallEventsService } from './fall-events.service';
import { FallEventsController } from './fall-events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FallEvent])],
  providers: [FallEventsService],
  controllers: [FallEventsController],
  exports: [FallEventsService],
})
export class FallEventsModule {}
