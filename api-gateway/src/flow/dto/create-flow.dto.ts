import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlowDto {
  @ApiProperty({
    example: '6789262377cdd443d81a7ab6',
  })
  @IsString()
  @IsNotEmpty()
  flowStatusId: string;

  @ApiProperty({
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({
    example: 'new feature rocket silent',
  })
  @IsString()
  @IsNotEmpty()
  note: string;
}
