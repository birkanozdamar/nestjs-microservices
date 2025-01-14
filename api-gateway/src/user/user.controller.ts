import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Yeni Kullanıcı Oluşturma' })
  @ApiResponse({
    status: 200,
    description: 'user creted has been succesfull',
  })
  @ApiResponse({
    status: 400,
    description: 'user creted has been loggin unsuccessfull',
  })
  @Post()
  create(@Res() response: Response, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, response);
  }

  @Get('/:page/:limit')
  async findAll(
    @Res() response: Response,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.userService.findAll(response, page, limit);
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(response, id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(response, userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.userService.remove(response, id);
  }
}
