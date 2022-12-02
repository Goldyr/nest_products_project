import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, desc: string, price: number): string {
    const newId = Math.floor(Math.random() * 1000).toString();
    const newProduct = new Product(newId, title, desc, price);
    this.products.push(newProduct);
    return newId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: string): Product {
    const product = this.findProduct(id);
    return { ...product };
  }

  updateProduct(
    id: string,
    title: string,
    desc: string,
    price: number,
  ): Product {
    const product = this.findProduct(id);

    product.title = title;
    product.description = desc;
    product.price = price;

    this.products.map((p) => (p.id !== product.id ? p : product));

    return { ...product };
  }

  deleteProduct(id: string): boolean {
    const product = this.findProduct(id);
    this.products = this.products.filter((p: Product) => p !== product);

    return true;
  }

  private findProduct(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Could not find product with id ${id}`);
    }
    return product;
  }
}
