import dayjs from 'dayjs/esm';

import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: 15175,
  paymentDate: dayjs('2024-08-31T22:57'),
  amount: 31757.7,
  paymentMethod: 'MOBILE_MONEY',
  status: 'COMPLETED',
};

export const sampleWithPartialData: IPayment = {
  id: 32493,
  paymentDate: dayjs('2024-08-31T22:50'),
  amount: 11587.66,
  paymentMethod: 'CREDIT_CARD',
  status: 'COMPLETED',
};

export const sampleWithFullData: IPayment = {
  id: 4213,
  paymentDate: dayjs('2024-09-01T08:49'),
  amount: 24172.59,
  paymentMethod: 'MOBILE_MONEY',
  transactionId: 'remonter brave nonobstant',
  status: 'PENDING',
};

export const sampleWithNewData: NewPayment = {
  paymentDate: dayjs('2024-08-31T11:20'),
  amount: 28159.66,
  paymentMethod: 'CASH_ON_DELIVERY',
  status: 'REFUNDED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
