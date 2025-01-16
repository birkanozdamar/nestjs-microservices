import { Test, TestingModule } from '@nestjs/testing';
import { SalesFlowStatusController } from './sales-flow-status.controller';

describe('SalesFlowStatusController', () => {
  let controller: SalesFlowStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesFlowStatusController],
    }).compile();

    controller = module.get<SalesFlowStatusController>(SalesFlowStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
