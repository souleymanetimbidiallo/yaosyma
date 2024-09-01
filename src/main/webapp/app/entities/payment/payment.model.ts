import dayjs from 'dayjs/esm';
import { IOrder } from 'app/entities/order/order.model';
import { IUser } from 'app/entities/user/user.model';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';
import { PaymentStatus } from 'app/entities/enumerations/payment-status.model';

export interface IPayment {
  id: number;
  paymentDate?: dayjs.Dayjs | null;
  amount?: number | null;
  paymentMethod?: keyof typeof PaymentMethod | null;
  transactionId?: string | null;
  status?: keyof typeof PaymentStatus | null;
  order?: Pick<IOrder, 'id'> | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };
