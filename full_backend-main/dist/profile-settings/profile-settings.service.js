"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_settings_entity_1 = require("./profile-settings.entity");
let ProfileSettingsService = class ProfileSettingsService {
    constructor(profileSettingsRepository) {
        this.profileSettingsRepository = profileSettingsRepository;
    }
    async create(data) {
        const profile = this.profileSettingsRepository.create(data);
        return this.profileSettingsRepository.save(profile);
    }
    async findLatest() {
        const profiles = await this.profileSettingsRepository.find({
            order: { created_at: 'DESC' },
            take: 1,
        });
        return profiles.length ? profiles[0] : null;
    }
};
ProfileSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_settings_entity_1.ProfileSettings)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileSettingsService);
exports.ProfileSettingsService = ProfileSettingsService;
//# sourceMappingURL=profile-settings.service.js.map