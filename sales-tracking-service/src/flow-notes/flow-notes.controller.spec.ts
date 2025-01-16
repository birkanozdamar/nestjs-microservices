import { Test, TestingModule } from '@nestjs/testing';
import { FlowNotesController } from './flow-notes.controller';

describe('FlowNotesController', () => {
  let controller: FlowNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowNotesController],
    }).compile();

    controller = module.get<FlowNotesController>(FlowNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
