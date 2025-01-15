import { Test, TestingModule } from '@nestjs/testing';
import { CustomerNoteController } from './customer-note.controller';

describe('CustomerNoteController', () => {
  let controller: CustomerNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerNoteController],
    }).compile();

    controller = module.get<CustomerNoteController>(CustomerNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
