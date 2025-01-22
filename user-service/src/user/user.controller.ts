import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { SignInDto } from './dto/signin-check.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PaginationDto from './dto/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user-respose.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'signCheck' })
  signinCheck(@Payload() signInDto: SignInDto) {
    return this.userService.signInCheck(signInDto);
  }

  @MessagePattern({ cmd: 'createUser' })
  async create(@Payload() createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto);
    console.log(res.user);
    return res;
  }

  @MessagePattern({ cmd: 'checkEmailUnique' })
  checkEmailUnique(@Payload() data: { email: string }) {
    return this.userService.checkEmailUnique(data.email);
  }

  @MessagePattern({ cmd: 'findAllUser' })
  async findAll(@Payload() findAllDto: PaginationDto) {
    const users = await this.userService.findAll(findAllDto);

    const usersResponse = plainToInstance(UserDto, users, {
      excludeExtraneousValues: true,
    });

    return {
      status: true,
      users: usersResponse,
      messages: 'Kullanıcılar',
    };
  }

  @MessagePattern({ cmd: 'findOneUser' })
  async findOne(@Payload() payload: { id: number }) {
    const { id } = payload;
    const user = await this.userService.findOne(id);
    const userResponse = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      status: true,
      user: userResponse, // gereksiz veriler veya güvenlik açığı oluşturabilecek bilgiler gizlendi
      messages: 'Kullanıcı',
    };
  }

  @MessagePattern({ cmd: 'updateUser' })
  async update(
    @Payload() payload: { id: number; updateUserDto: UpdateUserDto },
  ) {
    const { id, updateUserDto } = payload;

    return await this.userService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: 'removeUser' })
  async remove(@Payload() payload: { id: number }) {
    const { id } = payload;
    await this.userService.remove(id);
    return {
      status: true,
      user: '',
      messages: 'Kullanıcı Silindi',
    };
  }
}
