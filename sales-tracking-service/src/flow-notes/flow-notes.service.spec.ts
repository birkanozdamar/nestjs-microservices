import { Test, TestingModule } from '@nestjs/testing';
import { FlowNotesService } from './flow-notes.service';

describe('FlowNotesService', () => {
  let service: FlowNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowNotesService],
    }).compile();

    service = module.get<FlowNotesService>(FlowNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
