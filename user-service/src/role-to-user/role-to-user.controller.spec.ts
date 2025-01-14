import { Test, TestingModule } from '@nestjs/testing';
import { RoleToUserController } from './role-to-user.controller';

describe('RoleToUserController', () => {
  let controller: RoleToUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleToUserController],
    }).compile();

    controller = module.get<RoleToUserController>(RoleToUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
