import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString({ message: 'name must be a text' })
  @MaxLength(255)
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  @Min(0)
  @ApiProperty()
  price: number;

  @IsString({ message: 'description must be a text' })
  @ApiProperty()
  description: string;
}
