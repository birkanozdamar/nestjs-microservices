import { Test, TestingModule } from '@nestjs/testing';
import { SalesFlowStatusService } from './sales-flow-status.service';

describe('SalesFlowStatusService', () => {
  let service: SalesFlowStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesFlowStatusService],
    }).compile();

    service = module.get<SalesFlowStatusService>(SalesFlowStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
