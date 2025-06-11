"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const report_service_1 = require("./report.service");
const report_controller_1 = require("./report.controller");
const profile_settings_entity_1 = require("../profile-settings/profile-settings.entity");
const heart_rate_entity_1 = require("../heart-rate/heart-rate.entity");
const blood_oxygen_entity_1 = require("../blood-oxygen/blood-oxygen.entity");
const water_intake_entity_1 = require("../water-intake/water-intake.entity");
const fall_events_entity_1 = require("../fall-events/fall-events.entity");
let ReportModule = class ReportModule {
};
ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                profile_settings_entity_1.ProfileSettings,
                heart_rate_entity_1.HeartRate,
                blood_oxygen_entity_1.BloodOxygen,
                water_intake_entity_1.WaterIntake,
                fall_events_entity_1.FallEvent,
            ]),
        ],
        controllers: [report_controller_1.ReportController],
        providers: [report_service_1.ReportService],
        exports: [report_service_1.ReportService],
    })
], ReportModule);
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map