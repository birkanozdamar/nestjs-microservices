import { createSuperAdmin } from 'database/factory/user.factory';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

export const seedSuperAdmin = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const existingAdmin = await userRepository.findOne({
    where: { email: 'superadmin@birkan.com' },
  });

  if (!existingAdmin) {
    const superAdmin = await createSuperAdmin();
    await userRepository.save(superAdmin);
    console.log('Super Admin created!');
  } else {
    console.log('Super Admin already exists.');
  }
};
