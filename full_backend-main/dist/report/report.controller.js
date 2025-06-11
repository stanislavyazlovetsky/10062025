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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const report_service_1 = require("./report.service");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getWeeklyReport(res) {
        const buffer = await this.reportService.generatePdfBuffer();
        res.end(buffer);
    }
    async getWeeklyReportPdf(res) {
        const buffer = await this.reportService.generatePdfBuffer();
        res.end(buffer);
    }
};
__decorate([
    (0, common_1.Get)('weekly'),
    (0, common_1.Header)('Content-Type', 'application/pdf'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename=weekly-report.pdf'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getWeeklyReport", null);
__decorate([
    (0, common_1.Get)('weekly-pdf'),
    (0, common_1.Header)('Content-Type', 'application/pdf'),
    (0, common_1.Header)('Content-Disposition', 'attachment; filename="weekly-report.pdf"'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getWeeklyReportPdf", null);
ReportController = __decorate([
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map