import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleToUser } from './entities/role-to-user.entity';
import { Repository, DataSource } from 'typeorm';
import { AssignRoleDto } from './dto/assign-role.dto';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RoleToUserService {
  constructor(
    @InjectRepository(RoleToUser)
    private roleToUserRepository: Repository<RoleToUser>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async assignToRole(assignRoleDto: AssignRoleDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    console.log(assignRoleDto);
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [role, user] = await Promise.all([
        this.roleRepository.findOneBy({ id: assignRoleDto.role_id }),
        this.userRepository.findOneBy({ id: assignRoleDto.user_id }),
      ]);

      console.log(role, user);
      if (!role) throw new NotFoundException('Role Not Found');
      if (!user) throw new NotFoundException('User Not Found');

      const existingAssignment = await this.roleToUserRepository.findOneBy({
        role_id: assignRoleDto.role_id,
        user_id: assignRoleDto.user_id,
      });

      if (existingAssignment) {
        throw new ConflictException('User already has this role');
      }

      const roleToUser = this.roleToUserRepository.create({
        user_id: assignRoleDto.user_id,
        role_id: assignRoleDto.role_id,
        created_by_id: assignRoleDto.created_by_id,
      });
      console.log('asdasd1');
      await queryRunner.manager.save(roleToUser);
      console.log('asdasd2');
      await queryRunner.commitTransaction();
      return { status: true, message: 'Role assigned successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
