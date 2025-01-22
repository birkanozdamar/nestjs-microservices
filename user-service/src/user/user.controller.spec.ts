import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

const testName = 'superadmin';
const testEmail = 'superadmin@birkan.com';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                name: testName,
                email: testEmail,
                password:
                  '$2b$10$arJKcxccnhapHkfLTwj46OvYE6GUh3bo4JoeKE8rJ9yruQDj6DnP6',
              },
              {
                name: 'Kemal',
                email: 'kemal@kemal.com',
                password:
                  '$2b$10$arJKcxccnhapHkfLTwj46OvYE6GUh3bo4JoeKE8rJ9yruQDj6DnP6',
              },
              {
                name: 'Ebru',
                email: 'ebru@ebru.com',
                password:
                  '$2b$10$arJKcxccnhapHkfLTwj46OvYE6GUh3bo4JoeKE8rJ9yruQDj6DnP6',
              },
            ]),
            create: jest.fn().mockImplementation((user: CreateUserDto) =>
              Promise.resolve({
                status: true,
                user: {
                  id: 1,
                  name: user.name,
                  email: user.email,
                  password: user.password,
                },
                messages: 'Kullanıcı',
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('New User Dto', () => {
    it('should create a new user', async () => {
      const newUserDto: CreateUserDto = {
        name: 'Kemal',
        email: 'kemal@kemal.com',
        password: '123456',
      };

      await expect(controller.create(newUserDto)).resolves.toEqual({
        status: true,
        user: {
          id: 1,
          name: 'Kemal',
          email: 'kemal@kemal.com',
          password: '123456',
        },
        messages: 'Kullanıcı',
      });
    });
  });
});
