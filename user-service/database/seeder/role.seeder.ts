import { createRole } from 'database/factory/role.factory';
import { Role } from 'src/role/entities/role.entity';
import { DataSource } from 'typeorm';

export const seedRoles = async (dataSource: DataSource) => {
  const roles = [{ name: 'admin' }, { name: 'user' }, { name: 'customer' }];
  const roleRepository = dataSource.getRepository(Role);

  for (const role of roles) {
    const existingRole = await roleRepository.findOne({
      where: { name: role.name },
    });

    if (!existingRole) {
      const newRole = await createRole(role.name);
      await roleRepository.save(newRole);
      console.log(`Role ${role.name} created!`);
    } else {
      console.log(`Role ${role.name} already exists.`);
    }
  }
};
