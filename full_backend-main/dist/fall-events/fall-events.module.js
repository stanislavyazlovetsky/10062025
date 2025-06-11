"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallEventsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fall_events_entity_1 = require("./fall-events.entity");
const fall_events_service_1 = require("./fall-events.service");
const fall_events_controller_1 = require("./fall-events.controller");
let FallEventsModule = class FallEventsModule {
};
FallEventsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([fall_events_entity_1.FallEvent])],
        providers: [fall_events_service_1.FallEventsService],
        controllers: [fall_events_controller_1.FallEventsController],
        exports: [fall_events_service_1.FallEventsService],
    })
], FallEventsModule);
exports.FallEventsModule = FallEventsModule;
//# sourceMappingURL=fall-events.module.js.map