import dayjs from 'dayjs/esm';
import { IStore } from 'app/entities/store/store.model';
import { IUser } from 'app/entities/user/user.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';

export interface IOrder {
  id: number;
  orderDate?: dayjs.Dayjs | null;
  totalPrice?: number | null;
  status?: keyof typeof OrderStatus | null;
  paymentMethod?: keyof typeof PaymentMethod | null;
  deliveryAddress?: string | null;
  store?: Pick<IStore, 'id' | 'name'> | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
