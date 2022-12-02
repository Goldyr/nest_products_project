import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products/product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  await app.listen(3000);
}
bootstrap();
