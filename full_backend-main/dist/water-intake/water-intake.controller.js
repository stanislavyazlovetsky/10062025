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
exports.WaterIntakeController = void 0;
const common_1 = require("@nestjs/common");
const water_intake_service_1 = require("./water-intake.service");
let WaterIntakeController = class WaterIntakeController {
    constructor(waterService) {
        this.waterService = waterService;
    }
    getLast7Days() {
        return this.waterService.getLast7Days();
    }
};
__decorate([
    (0, common_1.Get)('week'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WaterIntakeController.prototype, "getLast7Days", null);
WaterIntakeController = __decorate([
    (0, common_1.Controller)('water-intake'),
    __metadata("design:paramtypes", [water_intake_service_1.WaterIntakeService])
], WaterIntakeController);
exports.WaterIntakeController = WaterIntakeController;
//# sourceMappingURL=water-intake.controller.js.map