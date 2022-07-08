import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/index';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getOneById(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({
        where: { product_id: id },
      });
    } catch (err) {
      console.log('Get one product by id error: ', err.message ?? err);
      throw new HttpException(
        `Product with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(product: CreateProductDto): Promise<Product> {
    const createdProduct = this.productRepository.create(product);
    return await this.productRepository.save(createdProduct);
  }

  async update(id: number, product: UpdateProductDto): Promise<Product> {
    let foundProduct = await this.productRepository.findOneBy({
      product_id: id,
    });

    if (!foundProduct) {
      throw new HttpException(
        `Product with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundProduct = { ...foundProduct, ...product, updated_at: new Date() };
    return await this.productRepository.save(foundProduct);
  }

  async delete(id: number): Promise<number> {
    let foundProduct = await this.productRepository.findOneBy({
      product_id: id,
    });

    if (!foundProduct) {
      throw new HttpException(
        `Product with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.productRepository.delete(id);
    return foundProduct.product_id;
  }
}
