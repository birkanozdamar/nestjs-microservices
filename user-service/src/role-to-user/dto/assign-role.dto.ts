import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignRoleDto {
  @IsNotEmpty()
  @IsNumber()
  role_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  created_by_id: number;
}
