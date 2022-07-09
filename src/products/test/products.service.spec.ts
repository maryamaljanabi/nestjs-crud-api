import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { ProductsService } from '../products.service';
import { mockProductsRepository } from './mockProductsRepository';
import { productsStub, productStub } from './product.stub';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of products', async () => {
      const cats = await service.getAll();
      expect(cats).toEqual(productsStub());
    });
  });

  describe('getOneById', () => {
    it('should get a single product', () => {
      expect(service.getOneById(1)).resolves.toEqual(productStub());
      expect(productRepository.findOneOrFail).toBeCalledWith({
        where: { product_id: 1 },
      });
    });

    it("should return an http error when product id doesn't exist", async () => {
      const id = 10;
      const spy = jest
        .spyOn(productRepository, 'findOneOrFail')
        .mockImplementationOnce(() => {
          throw new HttpException(
            `Product with id ${id} not found.`,
            HttpStatus.NOT_FOUND,
          );
        });
      await expect(service.getOneById(id)).rejects.toThrowError(HttpException);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        where: { product_id: id },
      });
    });
  });

  describe('create', () => {
    it('should successfully create a product', () => {
      expect(service.create(productStub())).resolves.toEqual(productStub());
      expect(productRepository.create).toBeCalledTimes(1);
      expect(productRepository.create).toBeCalledWith(productStub());
      expect(productRepository.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updatedProduct = await service.update(1, productStub());
      expect(updatedProduct).toEqual({
        ...productStub(),
        updated_at: updatedProduct.updated_at,
      });
      expect(productRepository.findOneBy).toBeCalledTimes(1);
      expect(productRepository.findOneBy).toBeCalledWith({
        product_id: 1,
      });
      expect(productRepository.save).toBeCalledTimes(1);
      expect(productRepository.save).toBeCalledWith(updatedProduct);
    });

    it("should return an http error when product id doesn't exist", async () => {
      const id = 10;
      const spy = jest
        .spyOn(productRepository, 'findOneBy')
        .mockImplementationOnce(() => undefined);
      await expect(service.update(id, productStub())).rejects.toThrowError(
        HttpException,
      );
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        product_id: id,
      });
      expect(productRepository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const deletedId = await service.delete(1);
      expect(deletedId).toEqual(1);
      expect(productRepository.findOneBy).toBeCalledTimes(1);
      expect(productRepository.findOneBy).toBeCalledWith({
        product_id: 1,
      });
      expect(productRepository.delete).toBeCalledTimes(1);
    });

    it("should return an http error when product id doesn't exist", async () => {
      const id = 10;
      const spy = jest
        .spyOn(productRepository, 'findOneBy')
        .mockImplementationOnce(() => undefined);
      await expect(service.delete(id)).rejects.toThrowError(HttpException);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        product_id: id,
      });
      expect(productRepository.delete).toBeCalledTimes(0);
    });
  });
});
