import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignRoleUserServiceResponseType } from 'src/auth/constants/userServiceResponseTypes';
import { Request, Response } from 'express';

@Injectable()
export class RoleService {
  constructor(
    @Inject('USER_SERVICE') private readonly roleServiceClient: ClientProxy,
  ) {}

  async assignRole(
    assignRoleDto: AssignRoleDto,
    response: Response,
    request: Request,
  ) {
    assignRoleDto.created_by_id = request['user'].id;
    try {
      const { status } = await this.roleServiceClient
        .send<AssignRoleUserServiceResponseType>(
          { cmd: 'assignRole' },
          assignRoleDto,
        )
        .toPromise();

      if (!status) {
        return response.status(HttpStatus.BAD_REQUEST).send({
          message: 'Role Kullanıcıya Atanamadı!',
        });
      }

      return response.status(HttpStatus.OK).send({
        message: 'Role Kullanıcıya Atandı!',
      });
    } catch (error) {
      console.error(error);
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Kayıt başarısız!',
      });
    }
  }
}
