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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallEventsController = void 0;
const common_1 = require("@nestjs/common");
const fall_events_service_1 = require("./fall-events.service");
let FallEventsController = class FallEventsController {
    constructor(fallEventsService) {
        this.fallEventsService = fallEventsService;
    }
    async getFallsLastWeek() {
        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - 1);
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6);
        return this.fallEventsService.findFallsInPeriod(startDate, endDate);
    }
};
__decorate([
    (0, common_1.Get)('week'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FallEventsController.prototype, "getFallsLastWeek", null);
FallEventsController = __decorate([
    (0, common_1.Controller)('fall-events'),
    __metadata("design:paramtypes", [fall_events_service_1.FallEventsService])
], FallEventsController);
exports.FallEventsController = FallEventsController;
//# sourceMappingURL=fall-events.controller.js.map