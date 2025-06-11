import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

import { ProfileSettings } from '../profile-settings/profile-settings.entity';
import { HeartRate } from '../heart-rate/heart-rate.entity';
import { BloodOxygen } from '../blood-oxygen/blood-oxygen.entity';
import { WaterIntake } from '../water-intake/water-intake.entity';
import { FallEvent } from '../fall-events/fall-events.entity';
import * as PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ProfileSettings)
    private readonly profileSettingsRepository: Repository<ProfileSettings>,

    @InjectRepository(HeartRate)
    private readonly pulseRepository: Repository<HeartRate>,

    @InjectRepository(BloodOxygen)
    private readonly oxygenRepository: Repository<BloodOxygen>,

    @InjectRepository(WaterIntake)
    private readonly waterRepository: Repository<WaterIntake>,

    @InjectRepository(FallEvent)
    private readonly fallRepository: Repository<FallEvent>,
  ) {}

  async getWeeklyReport() {
    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() - 1); // Вчора
    const start = new Date(end);
    start.setDate(start.getDate() - 6); // 6 днів назад від вчорашньої дати

    // Останні дані профілю
    const [profile] = await this.profileSettingsRepository.find({
  where: {},
  order: { created_at: 'DESC' },
  take: 1,
});


    // Пульс за 7 днів
    const pulses = await this.pulseRepository.find({
      where: {
        recorded_at: Between(start, end),
      },
    });

    // Кисень за 7 днів
    const oxygens = await this.oxygenRepository.find({
      where: {
        recorded_at: Between(start, end),
      },
    });

    // Вода за 7 днів
    const waters = await this.waterRepository.find({
      where: {
        date: Between(start, end),
      },
    });

    // Падіння за 7 днів
    const falls = await this.fallRepository.find({
      where: {
        detected_at: Between(start, end),
      },
    });

    // Допоміжна функція статистики
    function calcStats(arr: number[]) {
      if (arr.length === 0) return { avg: null, min: null, max: null };
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

  generateReportText(data: {
    profile: ProfileSettings | null;
    period: { start: Date; end: Date };
    pulseStats: { avg: number | null; min: number | null; max: number | null };
    oxygenStats: { avg: number | null; min: number | null; max: number | null };
    waterAvg: number | null;
    fallEvents: FallEvent[];
  }): string {
    const {
      profile,
      period,
      pulseStats,
      oxygenStats,
      waterAvg,
      fallEvents,
    } = data;

    const formatDate = (date: Date) =>
      date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const startDateStr = formatDate(period.start);
    const endDateStr = formatDate(period.end);

    const safeNum = (v: number | null) =>
      v !== null && !isNaN(v) ? v.toFixed(1) : 'нема даних';

    const anomalies: string[] = [];
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
    if (anomalies.length > 0) patientStatus = 'Потрібна консультація лікаря';

    const hydrationStatus =
      waterAvg !== null && waterAvg < 6
        ? 'Недостатній рівень гідратації'
        : 'Гідратація в нормі';

    const cardiovascularStatus =
      pulseStats.avg !== null && (pulseStats.avg < 60 || pulseStats.avg > 90)
        ? 'Відхилення у роботі серця'
        : 'Серцево-судинна система в нормі';

    const respiratoryStatus =
      oxygenStats.avg !== null && oxygenStats.avg < 95
        ? 'Потребує уваги дихальна система'
        : 'Дихальна система в нормі';

    return `
Звіт про стан здоров'я користувача

Ім'я користувача: ${profile?.name ?? 'нема даних'}
Вік: ${profile?.age ?? 'нема даних'}
Вага: ${profile?.weight ?? 'нема даних'}
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
async generatePdfBuffer(): Promise<Buffer> {
  const reportData = await this.getWeeklyReport();
  const reportText = this.generateReportText(reportData);

  const doc = new PDFDocument();
  const buffers: Uint8Array[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  const fontPath = path.resolve(__dirname, '../../assets/fonts/DejaVuSans.ttf');
  doc.font(fontPath).fontSize(12);
  doc.text(reportText, {
    align: 'left',
  });

  doc.end();

  return new Promise<Buffer>((resolve) => {
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
  });
}
}
