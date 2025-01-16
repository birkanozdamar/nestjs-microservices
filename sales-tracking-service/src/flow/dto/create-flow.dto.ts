import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlowDto {
  @IsString()
  @IsNotEmpty()
  flowStatusId: string;

  @IsString()
  @IsNotEmpty()
  customer_id: number;

  @IsString()
  @IsNotEmpty()
  note: string;
}
