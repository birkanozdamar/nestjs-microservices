import { Module } from '@nestjs/common';
import { RoleToUserController } from './role-to-user.controller';
import { RoleToUserService } from './role-to-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleToUser } from './entities/role-to-user.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleToUser, Role, User])],
  controllers: [RoleToUserController],
  providers: [RoleToUserService],
})
export class RoleToUserModule {}
