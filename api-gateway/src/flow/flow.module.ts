import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { ClientsModule } from '@nestjs/microservices';
import { SalesTrackingServiceTCPConnectionSettings } from 'settings/settings';

@Module({
  imports: [
    ClientsModule.register([SalesTrackingServiceTCPConnectionSettings]),
  ],
  providers: [FlowService],
  controllers: [FlowController],
})
export class FlowModule {}
