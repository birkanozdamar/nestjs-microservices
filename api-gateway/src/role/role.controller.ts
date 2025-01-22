import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'guards/auth.guard';
import { AssignRoleDto } from './dto/assign-role.dto';
import { RoleService } from './role.service';
import { Response } from 'express';
import { FingerPrintGuard } from 'guards/finger-print.guard';

@ApiBearerAuth()
@Controller('role')
@UseGuards(AuthGuard, FingerPrintGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Kullanıcıta Role Atama' })
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
