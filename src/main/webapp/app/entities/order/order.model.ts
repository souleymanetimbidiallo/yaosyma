import dayjs from 'dayjs/esm';
import { IClient } from 'app/entities/client/client.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';

export interface IOrder {
  id: number;
  orderNumber?: string | null;
  orderDate?: dayjs.Dayjs | null;
  totalPrice?: number | null;
  status?: keyof typeof OrderStatus | null;
  paymentMethod?: keyof typeof PaymentMethod | null;
  deliveryAddress?: string | null;
  signature?: string | null;
  client?: Pick<IClient, 'id' | 'email'> | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
