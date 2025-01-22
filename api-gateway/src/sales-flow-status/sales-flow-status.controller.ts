import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { SalesFlowStatusService } from './sales-flow-status.service';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'guards/auth.guard';
import { FingerPrintGuard } from 'guards/finger-print.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, FingerPrintGuard)
@Controller('sales-flow-status')
export class SalesFlowStatusController {
  constructor(
    private readonly salesFlowStatusController: SalesFlowStatusService,
  ) {}

  @Get()
  async getFlowStatuses(@Res() response: Response) {
    return this.salesFlowStatusController.getFlowStatuses(response);
  }
}
