import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString({ message: 'name must be a text' })
  @MaxLength(10)
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  @Min(0)
  price: number;

  @IsString({ message: 'description must be a text' })
  description: string;
}
