"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const data_module_1 = require("./data/data.module");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const profile_settings_module_1 = require("./profile-settings/profile-settings.module");
const heart_rate_module_1 = require("./heart-rate/heart-rate.module");
const blood_oxygen_module_1 = require("./blood-oxygen/blood-oxygen.module");
const water_intake_module_1 = require("./water-intake/water-intake.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: 'src/.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL || '...',
                autoLoadEntities: true,
                synchronize: true,
                ssl: true,
                extra: {
                    ssl: {
                        rejectUnauthorized: false,
                    },
                },
            }),
            data_module_1.DataModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            heart_rate_module_1.HeartRateModule,
            blood_oxygen_module_1.BloodOxygenModule,
            profile_settings_module_1.ProfileSettingsModule,
            water_intake_module_1.WaterIntakeModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map