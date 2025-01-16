import { Module } from '@nestjs/common';
import { SalesFlowStatusController } from './sales-flow-status.controller';
import { SalesFlowStatusService } from './sales-flow-status.service';
import { ClientsModule } from '@nestjs/microservices';
import { SalesTrackingServiceTCPConnectionSettings } from 'settings/settings';

@Module({
  imports: [
    ClientsModule.register([SalesTrackingServiceTCPConnectionSettings]),
  ],
  controllers: [SalesFlowStatusController],
  providers: [SalesFlowStatusService],
})
export class SalesFlowStatusModule {}
