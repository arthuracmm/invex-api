import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class CreateMovimentationDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsIn(['entry', 'output'])
  type?: 'entry' | 'output';
}
