// src/profile-settings/profile-settings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileSettingsService } from './profile-settings.service';
import { ProfileSettingsController } from './profile-settings.controller';
import { ProfileSettings } from './profile-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileSettings])],
  providers: [ProfileSettingsService],
  controllers: [ProfileSettingsController],
})
export class ProfileSettingsModule {}
