import { IsInt, IsOptional } from 'class-validator';

export default class PaginationDto {
  @IsOptional()
  @IsInt()
  page: number = 1;

  @IsOptional()
  @IsInt()
  limit: number = 10;
}
