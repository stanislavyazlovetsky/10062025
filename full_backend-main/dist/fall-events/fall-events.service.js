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
exports.FallEventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fall_events_entity_1 = require("./fall-events.entity");
let FallEventsService = class FallEventsService {
    constructor(fallEventsRepository) {
        this.fallEventsRepository = fallEventsRepository;
    }
    async findFallsInPeriod(startDate, endDate) {
        return this.fallEventsRepository.find({
            where: {
                detected_at: (0, typeorm_2.Between)(startDate, endDate),
            },
            order: { detected_at: 'ASC' },
        });
    }
};
FallEventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fall_events_entity_1.FallEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FallEventsService);
exports.FallEventsService = FallEventsService;
//# sourceMappingURL=fall-events.service.js.map