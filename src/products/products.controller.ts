import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getProduct(prodId);
  }

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productsService.addProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Put('/:id')
  updateProduct(
    @Param('id') patchId: string,
    @Body('title') patchTitle: string,
    @Body('description') patchDesc: string,
    @Body('price') patchPrice: number,
  ): Product {
    return this.productsService.updateProduct(
      patchId,
      patchTitle,
      patchDesc,
      patchPrice,
    );
  }

  @Delete('/:id')
  deleteProduct(@Param('id') deleteId: string): { message: string } {
    return this.productsService.deleteProduct(deleteId)
      ? { message: 'Deleted succesfully' }
      : { message: 'Something went wrong' };
  }
}
