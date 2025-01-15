import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signin-check.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import PaginationDto from './dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async signInCheck(signInDto: SignInDto) {
    try {
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
    } catch (error) {
      console.error(error);
      return { status: false, message: 'Error during sign-in.' };
    }
  }

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new User();
      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.password = await bcrypt.hash(createUserDto.password, 10);

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return {
        status: true,
        user: user,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      return {
        status: false,
        user: '',
        message: error,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.usersRepository.findOneBy({ id: id });

      if (!user) {
        return { status: false };
      }

      user.name = updateUserDto.name;
      user.email = updateUserDto.email;

      if (updateUserDto.password) {
        user.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return { status: true, user };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      return { status: false, message: 'Error during update.' };
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.usersRepository.findOneBy({ id: id });

      if (!user) {
        return { status: false };
      }

      await queryRunner.manager.softDelete(User, id);
      await queryRunner.commitTransaction();

      return { status: true, message: 'User deleted successfully.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      return { status: false, message: 'Error during deletion.' };
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    try {
      const { page, limit } = paginationDto;
      const skip = (page - 1) * limit;

      return this.usersRepository.find({
        skip: skip,
        take: limit,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching users');
    }
  }

  async findOne(id: number) {
    try {
      return await this.usersRepository.findOneBy({ id: id });
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user');
    }
  }
}
