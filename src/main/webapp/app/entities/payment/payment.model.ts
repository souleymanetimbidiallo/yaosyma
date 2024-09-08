import dayjs from 'dayjs/esm';
import { IOrder } from 'app/entities/order/order.model';
import { IClient } from 'app/entities/client/client.model';
import { PaymentMode } from 'app/entities/enumerations/payment-mode.model';
import { PaymentStatus } from 'app/entities/enumerations/payment-status.model';

export interface IPayment {
  id: number;
  paymentDate?: dayjs.Dayjs | null;
  amount?: number | null;
  paymentMode?: keyof typeof PaymentMode | null;
  transactionId?: string | null;
  status?: keyof typeof PaymentStatus | null;
  order?: Pick<IOrder, 'id' | 'orderNumber'> | null;
  client?: Pick<IClient, 'id' | 'email'> | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };
