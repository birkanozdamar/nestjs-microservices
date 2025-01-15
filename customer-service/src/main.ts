import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0', // Tüm ağ arayüzlerini dinle
        port: 4001, // TCP portu
      },
    },
  );
  await app.listen();
  console.log('Customer-Service is running on TCP port 4001');
}
bootstrap();
