import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export const createSuperAdmin = async (): Promise<User> => {
  const user = new User();
  user.name = 'superadmin';
  user.email = 'superadmin@birkan.com';
  user.password = await bcrypt.hash('SuperAdmin123!', 10);
  return user;
};
