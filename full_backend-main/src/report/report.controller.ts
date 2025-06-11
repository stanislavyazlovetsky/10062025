import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('weekly')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=weekly-report.pdf')
  async getWeeklyReport(@Res() res: Response) {
    const buffer = await this.reportService.generatePdfBuffer(); // PDF як Buffer
    res.end(buffer); // Відправляє PDF напряму
  }

  @Get('weekly-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="weekly-report.pdf"')
  async getWeeklyReportPdf(@Res() res: Response) {
    const buffer = await this.reportService.generatePdfBuffer();
    res.end(buffer);
  }
}

