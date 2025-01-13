import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { status, user } = await this.authServiceClient
        .send({ cmd: 'sign-check' }, createUserDto)
        .toPromise();

      if (!status) {
        return new BadRequestException();
      }

      return {
        message: 'Kayıt Başarılı',
        user: user,
      };
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
