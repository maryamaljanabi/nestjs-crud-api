import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const envModule = ConfigModule.forRoot({
  isGlobal: true,
});
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from 'config/typeorm.config';

@Module({
  imports: [envModule, TypeOrmModule.forRoot(typeormConnectionConfig)],
})
export class AppModule {}
