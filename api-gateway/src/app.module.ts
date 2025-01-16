import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerNoteModule } from './customer-note/customer-note.module';
import { SalesFlowStatusModule } from './sales-flow-status/sales-flow-status.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'user-service',
          port: 4000,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'customer-service',
          port: 4001,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'SALES_TRACKING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'customer-service',
          port: 4002,
        },
      },
    ]),
    UserModule,
    AuthModule,
    RoleModule,
    CustomerModule,
    CustomerNoteModule,
    SalesFlowStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
