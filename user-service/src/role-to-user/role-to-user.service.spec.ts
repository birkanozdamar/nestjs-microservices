import { Test, TestingModule } from '@nestjs/testing';
import { RoleToUserService } from './role-to-user.service';
import { Repository } from 'typeorm';
import { RoleToUser } from './entities/role-to-user.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { DataSource } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RoleToUserService', () => {
  let service: RoleToUserService;
  let roleRepository: Repository<Role>;
  let userRepository: Repository<User>;
  let roleToUserRepository: Repository<RoleToUser>;
  let dataSource: DataSource;

  const mockRoleRepository = {
    findOneBy: jest.fn(),
  };
  const mockUserRepository = {
    findOneBy: jest.fn(),
  };
  const mockRoleToUserRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };
  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      manager: {
        save: jest.fn(),
      },
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleToUserService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(RoleToUser),
          useValue: mockRoleToUserRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<RoleToUserService>(RoleToUserService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleToUserRepository = module.get<Repository<RoleToUser>>(
      getRepositoryToken(RoleToUser),
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('assignToRole', () => {
    it('should assign a role to user successfully', async () => {
      const assignRoleDto = {
        role_id: 1,
        user_id: 1,
        created_by_id: 1,
      };

      const role = { id: 1, name: 'Admin' };
      const user = { id: 1, name: 'John Doe' };

      mockRoleRepository.findOneBy.mockResolvedValue(role);
      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockRoleToUserRepository.findOneBy.mockResolvedValue(null); // No existing assignment
      mockRoleToUserRepository.create.mockReturnValue({ ...assignRoleDto });
      mockRoleToUserRepository.save.mockResolvedValue({ ...assignRoleDto });

      const result = await service.assignToRole(assignRoleDto);

      expect(result).toEqual({
        status: true,
        message: 'Role assigned successfully',
      });
    });

    it('should throw NotFoundException if role is not found', async () => {
      const assignRoleDto = { role_id: 1, user_id: 1, created_by_id: 1 };

      mockRoleRepository.findOneBy.mockResolvedValue(null); // Role not found

      await expect(service.assignToRole(assignRoleDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      const assignRoleDto = { role_id: 1, user_id: 1, created_by_id: 1 };
      const role = { id: 1, name: 'Admin' };

      mockRoleRepository.findOneBy.mockResolvedValue(role);
      mockUserRepository.findOneBy.mockResolvedValue(null); // User not found

      await expect(service.assignToRole(assignRoleDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if role is already assigned to the user', async () => {
      const assignRoleDto = { role_id: 1, user_id: 1, created_by_id: 1 };
      const role = { id: 1, name: 'Admin' };
      const user = { id: 1, name: 'John Doe' };

      mockRoleRepository.findOneBy.mockResolvedValue(role);
      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockRoleToUserRepository.findOneBy.mockResolvedValue({
        role_id: 1,
        user_id: 1,
      }); // Already assigned

      await expect(service.assignToRole(assignRoleDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
