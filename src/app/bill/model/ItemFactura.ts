import { Product } from './Product';

export class ItemFactura {

  product: Product;
  quantity: number = 1;
  amount: number;

  public calculateAmount(): number{
    return this.quantity * this.product.price;
  }
}
