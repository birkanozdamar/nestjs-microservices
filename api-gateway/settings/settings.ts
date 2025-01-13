import * as dotenv from 'dotenv';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';

dotenv.config();

// JWT ayarları
//jwt secret env dosyasından çekiyoruz
export const jwtSettings = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '60s' },
};

//ThrottlerModule Ayarları DDOS atak için request sınırlıyıcı
export const ThrottlerModuleSettings = {
  ttl: 0, // her modul için farklı olması için bu şekilde - kaç saniyede bir olsun ?
  limit: 0, // ttl süresi içinde kaç defa istek atabilir
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
