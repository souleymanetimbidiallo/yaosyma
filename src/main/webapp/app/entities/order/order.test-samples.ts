import dayjs from 'dayjs/esm';

import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 2537,
  orderDate: dayjs('2024-09-01T06:00'),
  totalPrice: 5807.74,
  status: 'PENDING',
  deliveryAddress: 'en bas de en bas de',
};

export const sampleWithPartialData: IOrder = {
  id: 7648,
  orderDate: dayjs('2024-08-31T15:04'),
  totalPrice: 6662.25,
  status: 'PENDING',
  paymentMethod: 'CREDIT_CARD',
  deliveryAddress: 'areu areu',
};

export const sampleWithFullData: IOrder = {
  id: 1103,
  orderDate: dayjs('2024-09-01T05:49'),
  totalPrice: 6638.85,
  status: 'DELIVERED',
  paymentMethod: 'CREDIT_CARD',
  deliveryAddress: 'totalement biathlète alors que',
};

export const sampleWithNewData: NewOrder = {
  orderDate: dayjs('2024-08-31T14:20'),
  totalPrice: 7579.53,
  status: 'DELIVERED',
  deliveryAddress: 'afin que tandis que',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
