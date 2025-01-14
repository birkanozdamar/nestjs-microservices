import { Role } from 'src/role/entities/role.entity';

export const createRole = async (name: string): Promise<Role> => {
  const role = new Role();
  role.name = name;
  return role;
};
