import { Test, TestingModule } from '@nestjs/testing';
import { FlowStatusController } from './flow-status.controller';

describe('FlowStatusController', () => {
  let controller: FlowStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowStatusController],
    }).compile();

    controller = module.get<FlowStatusController>(FlowStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
