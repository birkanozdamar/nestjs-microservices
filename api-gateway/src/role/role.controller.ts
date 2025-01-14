import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AssignRoleDto } from './dto/assign-role.dto';
import { RoleService } from './role.service';
import { Response } from 'express';

@ApiBearerAuth()
@Controller('role')
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Yeni Role Oluşturma' })
  @ApiResponse({
    status: 200,
    description: 'Yeni Role Oluşturma Başarılı',
  })
  @ApiResponse({
    status: 400,
    description: 'Yeni Role Oluşturma Başarısız',
  })
  @Post()
  assignRole(
    @Request() request,
    @Res() response: Response,
    @Body() AssignRoleDto: AssignRoleDto,
  ) {
    return this.roleService.assignRole(AssignRoleDto, response, request);
  }
}
