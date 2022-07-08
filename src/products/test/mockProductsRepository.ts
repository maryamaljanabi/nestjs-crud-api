import { Product } from '../product.entity';
import { productsStub, productStub } from './product.stub';

export const mockProductsRepository = {
  find: jest.fn().mockResolvedValue(productsStub()),
  findOneOrFail: jest.fn().mockResolvedValue(productStub()),
  findOneBy: jest.fn().mockResolvedValue(productStub()),
  create: jest.fn().mockResolvedValue(productStub()),
  save: jest.fn((product: Product) => product),
  delete: jest.fn((id: number) => id),
};
