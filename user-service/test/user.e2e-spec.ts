import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  //fake sqlite oluşturuyoruz
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should create a new user', async () => {
    jest.setTimeout(10000);
    //fake sqlite oluşturuyoruz
    const createUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    };

    const result = await controller.create(createUserDto);
    if (typeof result.user !== 'string') {
      expect(result.user.name).toBe('John Doe');
      expect(result.user.email).toBe('john.doe@example.com');
    } else {
      expect(result.user).toBe('Expected error message or empty string');
    }
  });
});
