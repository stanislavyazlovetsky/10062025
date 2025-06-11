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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_settings_entity_1 = require("../profile-settings/profile-settings.entity");
const heart_rate_entity_1 = require("../heart-rate/heart-rate.entity");
const blood_oxygen_entity_1 = require("../blood-oxygen/blood-oxygen.entity");
const water_intake_entity_1 = require("../water-intake/water-intake.entity");
const fall_events_entity_1 = require("../fall-events/fall-events.entity");
const PDFDocument = require("pdfkit");
const path = require("path");
let ReportService = class ReportService {
    constructor(profileSettingsRepository, pulseRepository, oxygenRepository, waterRepository, fallRepository) {
        this.profileSettingsRepository = profileSettingsRepository;
        this.pulseRepository = pulseRepository;
        this.oxygenRepository = oxygenRepository;
        this.waterRepository = waterRepository;
        this.fallRepository = fallRepository;
    }
    async getWeeklyReport() {
        const today = new Date();
        const end = new Date(today);
        end.setDate(end.getDate() - 1);
        const start = new Date(end);
        start.setDate(start.getDate() - 6);
        const [profile] = await this.profileSettingsRepository.find({
            where: {},
            order: { created_at: 'DESC' },
            take: 1,
        });
        const pulses = await this.pulseRepository.find({
            where: {
                recorded_at: (0, typeorm_2.Between)(start, end),
            },
        });
        const oxygens = await this.oxygenRepository.find({
            where: {
                recorded_at: (0, typeorm_2.Between)(start, end),
            },
        });
        const waters = await this.waterRepository.find({
            where: {
                date: (0, typeorm_2.Between)(start, end),
            },
        });
        const falls = await this.fallRepository.find({
            where: {
                detected_at: (0, typeorm_2.Between)(start, end),
            },
        });
        function calcStats(arr) {
            if (arr.length === 0)
                return { avg: null, min: null, max: null };
            const sum = arr.reduce((a, b) => a + b, 0);
            return {
                avg: sum / arr.length,
                min: Math.min(...arr),
                max: Math.max(...arr),
            };
        }
        const pulseValues = pulses.map(p => p.pulse);
        const pulseStats = calcStats(pulseValues);
        const oxygenValues = oxygens.map(o => o.oxygen_level);
        const oxygenStats = calcStats(oxygenValues);
        const waterValues = waters.map(w => w.cups);
        const waterAvg = waterValues.length > 0 ? waterValues.reduce((a, b) => a + b, 0) / waterValues.length : null;
        return {
            profile,
            period: { start, end },
            pulseStats,
            oxygenStats,
            waterAvg,
            fallEvents: falls,
        };
    }
    generateReportText(data) {
        var _a, _b, _c;
        const { profile, period, pulseStats, oxygenStats, waterAvg, fallEvents, } = data;
        const formatDate = (date) => date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const startDateStr = formatDate(period.start);
        const endDateStr = formatDate(period.end);
        const safeNum = (v) => v !== null && !isNaN(v) ? v.toFixed(1) : 'нема даних';
        const anomalies = [];
        if (pulseStats.max !== null && pulseStats.max > 100)
            anomalies.push(`Високий пульс: макс. ${pulseStats.max.toFixed(0)}`);
        if (pulseStats.min !== null && pulseStats.min < 50)
            anomalies.push(`Низький пульс: мін. ${pulseStats.min.toFixed(0)}`);
        if (oxygenStats.min !== null && oxygenStats.min < 90)
            anomalies.push(`Низький рівень кисню: мін. ${oxygenStats.min.toFixed(0)}`);
        const fallsText = fallEvents.length === 0
            ? 'Відсутні'
            : fallEvents.map(f => {
                const dt = f.detected_at.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
                return `${dt} - Падіння зафіксовано`;
            }).join('\n');
        let patientStatus = 'Стан стабільний';
        if (anomalies.length > 0)
            patientStatus = 'Потрібна консультація лікаря';
        const hydrationStatus = waterAvg !== null && waterAvg < 6
            ? 'Недостатній рівень гідратації'
            : 'Гідратація в нормі';
        const cardiovascularStatus = pulseStats.avg !== null && (pulseStats.avg < 60 || pulseStats.avg > 90)
            ? 'Відхилення у роботі серця'
            : 'Серцево-судинна система в нормі';
        const respiratoryStatus = oxygenStats.avg !== null && oxygenStats.avg < 95
            ? 'Потребує уваги дихальна система'
            : 'Дихальна система в нормі';
        return `
Звіт про стан здоров'я користувача

Ім'я користувача: ${(_a = profile === null || profile === void 0 ? void 0 : profile.name) !== null && _a !== void 0 ? _a : 'нема даних'}
Вік: ${(_b = profile === null || profile === void 0 ? void 0 : profile.age) !== null && _b !== void 0 ? _b : 'нема даних'}
Вага: ${(_c = profile === null || profile === void 0 ? void 0 : profile.weight) !== null && _c !== void 0 ? _c : 'нема даних'}
Дата: з ${startDateStr} по ${endDateStr}

Серцевий ритм (Heart rate):
1. Середній: ${safeNum(pulseStats.avg)} уд./хв
2. Мінімальний: ${safeNum(pulseStats.min)} уд./хв
3. Максимальний: ${safeNum(pulseStats.max)} уд./хв
Аномалії:
${anomalies.length > 0 ? anomalies.join('\n') : 'Відсутні'}

Рівень кисню в крові (SpO2):
1. Середній: ${safeNum(oxygenStats.avg)}%
2. Мінімальний: ${safeNum(oxygenStats.min)}%
3. Максимальний: ${safeNum(oxygenStats.max)}%
Аномалії:
${oxygenStats.min !== null && oxygenStats.min < 90 ? 'Низький рівень кисню' : 'Відсутні'}

Кількість води:
Середній показник: ${waterAvg !== null ? waterAvg.toFixed(1) : 'нема даних'} чашок
Норма: 8 чашок

Падіння:
${fallsText}

Події:
${anomalies.length > 0 ? anomalies.join('\n') : 'Відсутні'}

Стан пацієнта:
${patientStatus}

Оцінка гідратації:
${hydrationStatus}

Стан серцево-судинної системи:
${cardiovascularStatus}

Стан дихальної системи:
${respiratoryStatus}
    `.trim();
    }
    async generatePdfBuffer() {
        const reportData = await this.getWeeklyReport();
        const reportText = this.generateReportText(reportData);
        const doc = new PDFDocument();
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => { });
        const fontPath = path.resolve(__dirname, '../../assets/fonts/DejaVuSans.ttf');
        doc.font(fontPath).fontSize(12);
        doc.text(reportText, {
            align: 'left',
        });
        doc.end();
        return new Promise((resolve) => {
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });
        });
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_settings_entity_1.ProfileSettings)),
    __param(1, (0, typeorm_1.InjectRepository)(heart_rate_entity_1.HeartRate)),
    __param(2, (0, typeorm_1.InjectRepository)(blood_oxygen_entity_1.BloodOxygen)),
    __param(3, (0, typeorm_1.InjectRepository)(water_intake_entity_1.WaterIntake)),
    __param(4, (0, typeorm_1.InjectRepository)(fall_events_entity_1.FallEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map