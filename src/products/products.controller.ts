import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/index';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async GetAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getOneById(id);
  }

  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.create(product);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.productsService.delete(id);
  }
}
