import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './index';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
