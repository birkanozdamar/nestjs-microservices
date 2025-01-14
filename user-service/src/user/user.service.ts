import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signin-check.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import PaginationDto from './dto/find-all-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

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

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.password = await bcrypt.hash(createUserDto.password, 10);

      return {
        status: true,
        user: this.usersRepository.save(user),
      };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        user: '',
        message: error,
      };
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    return this.usersRepository.find({
      skip: skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });

    return user;
  }

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
