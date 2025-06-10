import { Repository } from 'typeorm';
import { ProfileSettings } from './profile-settings.entity';
import { CreateProfileSettingsDto } from './create-profile-settings.dto';
export declare class ProfileSettingsService {
    private profileSettingsRepository;
    constructor(profileSettingsRepository: Repository<ProfileSettings>);
    create(data: CreateProfileSettingsDto): Promise<ProfileSettings>;
}
