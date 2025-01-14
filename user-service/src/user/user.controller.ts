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
    console.log(users);
    const usersResponses = plainToInstance(UserDto, users, {
      excludeExtraneousValues: true,
    });
    console.log(usersResponses);
    return {
      status: true,
      users: usersResponses,
      messages: 'Kullanıcılar',
    };
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
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
