import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ProfileSettingsService } from './profile-settings.service';
import { CreateProfileSettingsDto } from './create-profile-settings.dto';

@Controller('profile-settings')
export class ProfileSettingsController {
  constructor(private readonly profileSettingsService: ProfileSettingsService) {}

  @Post()
  async create(@Body() createProfileSettingsDto: CreateProfileSettingsDto) {
    const profile = await this.profileSettingsService.create(createProfileSettingsDto);
    return { message: 'Profile saved successfully', profile };
  }
  
  @Get('latest')
  async getLatest() {
    const latestProfile = await this.profileSettingsService.findLatest();
    if (!latestProfile) {
      return { message: 'No profiles found' };
    }
    return latestProfile;
  }
}
