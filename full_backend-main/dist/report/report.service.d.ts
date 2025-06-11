/// <reference types="node" />
/// <reference types="node" />
import { Repository } from 'typeorm';
import { ProfileSettings } from '../profile-settings/profile-settings.entity';
import { HeartRate } from '../heart-rate/heart-rate.entity';
import { BloodOxygen } from '../blood-oxygen/blood-oxygen.entity';
import { WaterIntake } from '../water-intake/water-intake.entity';
import { FallEvent } from '../fall-events/fall-events.entity';
export declare class ReportService {
    private readonly profileSettingsRepository;
    private readonly pulseRepository;
    private readonly oxygenRepository;
    private readonly waterRepository;
    private readonly fallRepository;
    constructor(profileSettingsRepository: Repository<ProfileSettings>, pulseRepository: Repository<HeartRate>, oxygenRepository: Repository<BloodOxygen>, waterRepository: Repository<WaterIntake>, fallRepository: Repository<FallEvent>);
    getWeeklyReport(): Promise<{
        profile: ProfileSettings;
        period: {
            start: Date;
            end: Date;
        };
        pulseStats: {
            avg: number;
            min: number;
            max: number;
        };
        oxygenStats: {
            avg: number;
            min: number;
            max: number;
        };
        waterAvg: number;
        fallEvents: FallEvent[];
    }>;
    generateReportText(data: {
        profile: ProfileSettings | null;
        period: {
            start: Date;
            end: Date;
        };
        pulseStats: {
            avg: number | null;
            min: number | null;
            max: number | null;
        };
        oxygenStats: {
            avg: number | null;
            min: number | null;
            max: number | null;
        };
        waterAvg: number | null;
        fallEvents: FallEvent[];
    }): string;
    generatePdfBuffer(): Promise<Buffer>;
}
