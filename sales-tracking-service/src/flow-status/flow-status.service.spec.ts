import { Test, TestingModule } from '@nestjs/testing';
import { FlowStatusService } from './flow-status.service';

describe('FlowStatusService', () => {
  let service: FlowStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowStatusService],
    }).compile();

    service = module.get<FlowStatusService>(FlowStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
