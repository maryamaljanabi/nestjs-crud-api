import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const envModule = ConfigModule.forRoot({
  isGlobal: true,
});
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from 'src/config/typeorm.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    ProductsModule,
  ],
})
export class AppModule {}
