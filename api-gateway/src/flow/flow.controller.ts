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
import { AuthGuard } from 'guards/auth.guard';
import { FingerPrintGuard } from 'guards/finger-print.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, FingerPrintGuard)
@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Post()
  createFlow(
    @Request() request,
    @Res() response: Response,
    @Body() createFlowDto: CreateFlowDto,
  ) {
    return this.flowService.createFlow(createFlowDto, response, request);
  }

  @Get()
  async getFlows(@Res() response: Response) {
    return this.flowService.getFlowStatuses(response);
  }
}
