"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const data_controller_1 = require("./data.controller");
describe('DataController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [data_controller_1.DataController],
        }).compile();
        controller = module.get(data_controller_1.DataController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=data.controller.spec.js.map