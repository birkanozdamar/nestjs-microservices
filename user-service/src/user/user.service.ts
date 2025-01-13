import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signin-check.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MessagePattern } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  @MessagePattern({ cmd: 'sign-check' })
  async signInCheck(signInDto: SignInDto) {
    const user = await this.usersRepository.findOne({
      where: { email: signInDto.email },
    });

    if (!user) {
      return { status: false };
    }

    const validPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!validPassword) {
      return { status: false };
    }
    return {
      status: true,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };
  }
  @MessagePattern({ cmd: 'user-create' })
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    return this.usersRepository.save(user);
  }
  @MessagePattern({ cmd: 'user-all' })
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  @MessagePattern({ cmd: 'user-find' })
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  @MessagePattern({ cmd: 'user-update' })
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) {
      return { status: false };
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });

    if (!user) {
      return { status: false };
    }

    return await this.usersRepository.softDelete(id);
  }
}
