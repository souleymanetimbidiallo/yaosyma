import { IOrder } from 'app/entities/order/order.model';
import { IProduct } from 'app/entities/product/product.model';

export interface IOrderItem {
  id: number;
  quantity?: number | null;
  unitPrice?: number | null;
  totalPrice?: number | null;
  order?: Pick<IOrder, 'id'> | null;
  product?: Pick<IProduct, 'id' | 'name'> | null;
}

export type NewOrderItem = Omit<IOrderItem, 'id'> & { id: null };
