import { Test, TestingModule } from '@nestjs/testing';
import { RoleToUserService } from './role-to-user.service';

describe('RoleToUserService', () => {
  let service: RoleToUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleToUserService],
    }).compile();

    service = module.get<RoleToUserService>(RoleToUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
