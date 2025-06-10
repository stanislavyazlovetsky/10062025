import { ProfileSettingsService } from './profile-settings.service';
import { CreateProfileSettingsDto } from './create-profile-settings.dto';
export declare class ProfileSettingsController {
    private readonly profileSettingsService;
    constructor(profileSettingsService: ProfileSettingsService);
    create(createProfileSettingsDto: CreateProfileSettingsDto): Promise<{
        message: string;
        profile: import("./profile-settings.entity").ProfileSettings;
    }>;
}
