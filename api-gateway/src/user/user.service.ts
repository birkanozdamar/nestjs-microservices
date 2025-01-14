import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import {
  CreateUserServiceResponse,
  FindAllUserServiceResponse,
  FindUserServiceResponse,
} from 'src/auth/constants/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}
  // createUser,findAllUser,findOneUser,updateUser,removeUser
  async create(createUserDto: CreateUserDto, response: Response) {
    try {
      const { status, user } = await this.userServiceClient
        .send<CreateUserServiceResponse>({ cmd: 'createUser' }, createUserDto)
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
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Kullanıcı Kayıt başarısız!',
      });
    }
  }

  async findAll(response: Response, page: number, limit: number) {
    try {
      const { status, users } = await this.userServiceClient
        .send<FindAllUserServiceResponse>(
          { cmd: 'findAllUser' },
          { page, limit },
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Kullanıcılar bulunamadı',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Kullanıcılar!',
        users: users,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Kullanıcı Kayıt başarısız!',
      });
    }
  }

  async findOne(response: Response, id: number) {
    try {
      const { status, user } = await this.userServiceClient
        .send<FindUserServiceResponse>({ cmd: 'findOneUser' }, { id })
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.NOT_FOUND).send({
          message: 'Kullanıcı bulunamadı',
        });
      }
      console.log(user);
      return response.status(HttpStatus.OK).send({
        message: 'kullanıcı!',
        user: user,
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'İşlem Başarısız!',
      });
    }

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
