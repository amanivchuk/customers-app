import {ItemFactura} from './ItemFactura';
import {Customer} from '../../customer/Customer';

export class Bill {

  id: number;
  description: string;
  comment: string;
  items: Array<ItemFactura> = [];
  customer: Customer;
  total: number;
  createdAt: Date;

  calculateGranTotal(): number{
    this.total = 0;
    this.items.forEach((item: ItemFactura) => {
      this.total += this.total + item.calculateAmount();
    });
    return this.total;
  }
}
