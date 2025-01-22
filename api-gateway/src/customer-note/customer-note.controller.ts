import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CustomerNoteService } from './customer-note.service';
import { CreateCustomerNoteDto } from './dto/create-customer-notes.dto';
import { Response } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateCustomerNotesDto } from './dto/update-customer-notes.dto';
import { FingerPrintGuard } from 'guards/finger-print.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, FingerPrintGuard)
@Controller('customer-note')
export class CustomerNoteController {
  constructor(private readonly customerNoteService: CustomerNoteService) {}

  @Post()
  createCustomerNote(
    @Request() request,
    @Res() response: Response,
    @Body() createCustomerNoteDto: CreateCustomerNoteDto,
  ) {
    return this.customerNoteService.createCustomerNote(
      createCustomerNoteDto,
      response,
      request,
    );
  }

  @Get('/:customer_id')
  async findAll(
    @Res() response: Response,
    @Param('customer_id') customer_id: number,
  ) {
    return this.customerNoteService.getCustomerNote(
      { id: customer_id },
      response,
    );
  }

  @Put(':id')
  update(
    @Request() request,
    @Res() response: Response,
    @Param('id') customerNoteId: string,
    @Body() UpdateCustomerNotesDto: UpdateCustomerNotesDto,
  ) {
    return this.customerNoteService.updateCustomerNote(
      request,
      response,
      customerNoteId,
      UpdateCustomerNotesDto,
    );
  }
}
