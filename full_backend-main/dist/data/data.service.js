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
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pulse_data_entity_1 = require("./entities/pulse_data.entity");
const oxygen_data_entity_1 = require("./entities/oxygen_data.entity");
let DataService = class DataService {
    constructor(pulseRepo, spo2Repo) {
        this.pulseRepo = pulseRepo;
        this.spo2Repo = spo2Repo;
    }
    async saveData(data) {
        const pulse = this.pulseRepo.create({
            customer_id: data.customer_id,
            pulse: data.bpm,
        });
        const spo2 = this.spo2Repo.create({
            customer_id: data.customer_id,
            oxygenLevel: data.spo2,
        });
        await this.pulseRepo.save(pulse);
        await this.spo2Repo.save(spo2);
        return { message: '✅ Saved to both tables' };
    }
};
DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pulse_data_entity_1.PulseData)),
    __param(1, (0, typeorm_1.InjectRepository)(oxygen_data_entity_1.OxygenData)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map