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
exports.WaterIntakeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const water_intake_entity_1 = require("./water-intake.entity");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
let WaterIntakeService = class WaterIntakeService {
    constructor(waterRepo) {
        this.waterRepo = waterRepo;
    }
    async getLast7Days() {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);
        const result = await this.waterRepo.find({
            where: {
                user_id: 1,
                date: (0, typeorm_3.Between)(sevenDaysAgo, today),
            },
            order: { date: 'ASC' },
        });
        return result.map((entry) => ({
            date: new Date(entry.date).toISOString().split('T')[0],
            cups: entry.cups,
        }));
    }
};
WaterIntakeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(water_intake_entity_1.WaterIntake)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WaterIntakeService);
exports.WaterIntakeService = WaterIntakeService;
//# sourceMappingURL=water-intake.service.js.map