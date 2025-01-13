import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}
  // createUser,findAllUser,findOneUser,updateUser,removeUser
  async create(createUserDto: CreateUserDto, response: Response) {
    try {
      const { status, user } = await this.authServiceClient
        .send({ cmd: 'createUser' }, createUserDto)
        .toPromise();
      if (!status) {
        return response.status(HttpStatus.BAD_REQUEST).send({
          message: 'Kullanıcı Kayıt başarısız!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Kullanıcı Kayıt Başarılı!',
        user: user,
      });
    } catch (error) {
      console.error(error);
      return new BadRequestException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
