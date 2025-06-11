import { FallEventsService } from './fall-events.service';
export declare class FallEventsController {
    private readonly fallEventsService;
    constructor(fallEventsService: FallEventsService);
    getFallsLastWeek(): Promise<import("./fall-events.entity").FallEvent[]>;
}
