import { IsNotEmpty, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export abstract class PageRequest {
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  @Field((type) => Number)
  page: number | 1;

  @IsNotEmpty()
  @IsPositive()
  @Max(50)
  @Type(() => Number)
  @Field((type) => Number)
  limit: number | 10;

  getOffset(): number {
    return (this.page - 1) * this.limit;
  }

  getLimit(): number {
    return this.limit;
  }

  getPage(): number {
    return this.page;
  }
}
