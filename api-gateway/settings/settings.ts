import * as dotenv from 'dotenv';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';

dotenv.config();

// JWT ayarları
//jwt secret env dosyasından çekiyoruz
export const jwtSettings = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1d' },
};

//ThrottlerModule Ayarları DDOS atak için request sınırlıyıcı
export const ThrottlerModuleSettings = {
  ttl: 10000, // her modul için farklı olması için bu şekilde - kaç saniyede bir olsun ?
  limit: 2, // ttl süresi içinde kaç defa istek atabilir
};

//User Servis TCP bağlantı Ayarları
export const UserServiceTCPConnectionSettings: ClientProviderOptions = {
  name: 'USER_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'user-service',
    port: 4000,
  },
};

//Customer Servis TCP bağlantı Ayarları
export const CustomerServiceTCPConnectionSettings: ClientProviderOptions = {
  name: 'CUSTOMER_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'customer-service',
    port: 4001,
  },
};
