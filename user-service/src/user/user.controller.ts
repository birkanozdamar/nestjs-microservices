import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { SignInDto } from './dto/signin-check.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PaginationDto from './dto/find-all-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user-respose.dto';

// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { SignInDto } from './dto/signin-check.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'signCheck' })
  signinCheck(@Payload() signInDto: SignInDto) {
    return this.userService.signInCheck(signInDto);
  }

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
  async findOne(@Payload() id: number) {
    const user = await this.userService.findOne(id);

    const userResponse = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      status: true,
      user: userResponse, // gereksiz verler veya güvnelik açığı oluşturabilecek bilgiler gizlendi
      messages: 'Kullanıcı',
    };
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
