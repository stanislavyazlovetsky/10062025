import { Response } from 'express';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getWeeklyReport(res: Response): Promise<void>;
    getWeeklyReportPdf(res: Response): Promise<void>;
}
