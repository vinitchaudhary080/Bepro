import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryTeamDto {
  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }: { value: any }) => {
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? 1 : Math.max(1, n);
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @Transform(({ value }: { value: any }) => {
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? 10 : Math.max(1, n);
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;

  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy: 'createdAt' | 'name' | 'slug' = 'createdAt';

  @ApiPropertyOptional({ example: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({ example: 'delhi' })
  @IsOptional()
  @IsString()
  search?: string;
}
