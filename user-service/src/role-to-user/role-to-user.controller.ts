import { Controller } from '@nestjs/common';
import { RoleToUserService } from './role-to-user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('role-to-user')
export class RoleToUserController {
  constructor(private readonly roleToUserService: RoleToUserService) {}

  @MessagePattern({ cmd: 'assignRole' })
  assignToRole(@Payload() assignRoleDto: AssignRoleDto) {
    return this.roleToUserService.assignToRole(assignRoleDto);
  }
}
