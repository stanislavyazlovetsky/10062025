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
exports.ProfileSettingsController = void 0;
const common_1 = require("@nestjs/common");
const profile_settings_service_1 = require("./profile-settings.service");
const create_profile_settings_dto_1 = require("./create-profile-settings.dto");
let ProfileSettingsController = class ProfileSettingsController {
    constructor(profileSettingsService) {
        this.profileSettingsService = profileSettingsService;
    }
    async create(createProfileSettingsDto) {
        const profile = await this.profileSettingsService.create(createProfileSettingsDto);
        return { message: 'Profile saved successfully', profile };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profile_settings_dto_1.CreateProfileSettingsDto]),
    __metadata("design:returntype", Promise)
], ProfileSettingsController.prototype, "create", null);
ProfileSettingsController = __decorate([
    (0, common_1.Controller)('profile-settings'),
    __metadata("design:paramtypes", [profile_settings_service_1.ProfileSettingsService])
], ProfileSettingsController);
exports.ProfileSettingsController = ProfileSettingsController;
//# sourceMappingURL=profile-settings.controller.js.map