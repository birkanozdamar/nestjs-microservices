import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { seedSuperAdmin } from 'database/seeder/user.seeder';
import { DataSource } from 'typeorm';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0', // Tüm ağ arayüzlerini dinle
        port: 4000, // TCP portu
      },
    },
  );
  const dataSource = app.get(DataSource); //başlangıçta süper admin oluşturmak için
  await seedSuperAdmin(dataSource); // başlangıçta süper admin oluşturmak için

  await app.listen();
  console.log('User-Service is running on TCP port 4000');
}
bootstrap();
