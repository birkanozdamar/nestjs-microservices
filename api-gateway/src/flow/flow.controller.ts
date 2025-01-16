import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FlowService } from './flow.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Post()
  createCustomerNote(
    @Request() request,
    @Res() response: Response,
    @Body() createFlowDto: CreateFlowDto,
  ) {
    return this.flowService.createCustomerNote(
      createFlowDto,
      response,
      request,
    );
  }

  @Get()
  async getFlows(@Res() response: Response) {
    return this.flowService.getFlowStatuses(response);
  }
}
