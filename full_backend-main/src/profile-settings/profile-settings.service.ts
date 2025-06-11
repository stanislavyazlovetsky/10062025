// src/profile-settings/profile-settings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileSettings } from './profile-settings.entity';
import { CreateProfileSettingsDto } from './create-profile-settings.dto';

@Injectable()
export class ProfileSettingsService {
  constructor(
    @InjectRepository(ProfileSettings)
    private profileSettingsRepository: Repository<ProfileSettings>,
  ) {}

  async create(data: CreateProfileSettingsDto): Promise<ProfileSettings> {
    const profile = this.profileSettingsRepository.create(data);
    return this.profileSettingsRepository.save(profile);
  }

  async findLatest(): Promise<ProfileSettings | null> {
  const profiles = await this.profileSettingsRepository.find({
    order: { created_at: 'DESC' },
    take: 1,
  });
  return profiles.length ? profiles[0] : null;
}
}