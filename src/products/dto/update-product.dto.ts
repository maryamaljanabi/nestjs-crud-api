import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './index';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
