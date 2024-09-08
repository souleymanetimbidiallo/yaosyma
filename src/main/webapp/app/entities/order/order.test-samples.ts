import dayjs from 'dayjs/esm';

import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 27387,
  orderNumber: 'déjà',
  orderDate: dayjs('2024-08-31T11:59'),
  totalPrice: 21130.65,
  status: 'DELIVERED',
  paymentMethod: 'PAYPAL',
  deliveryAddress: 'échapper pin-pon dès que',
};

export const sampleWithPartialData: IOrder = {
  id: 4315,
  orderNumber: 'bien que devant proche de',
  orderDate: dayjs('2024-09-01T00:54'),
  totalPrice: 3007.56,
  status: 'CONFIRMED',
  paymentMethod: 'CASH_ON_DELIVERY',
  deliveryAddress: 'rapide',
  signature: 'circuler près de',
};

export const sampleWithFullData: IOrder = {
  id: 3629,
  orderNumber: 'apprivoiser oui',
  orderDate: dayjs('2024-08-31T15:09'),
  totalPrice: 8129.75,
  status: 'PENDING',
  paymentMethod: 'BANK_TRANSFER',
  deliveryAddress: 'divinement pourvu que alors',
  signature: "d'après contraindre",
};

export const sampleWithNewData: NewOrder = {
  orderNumber: 'toc-toc',
  orderDate: dayjs('2024-09-01T10:10'),
  totalPrice: 1445.11,
  status: 'DELIVERED',
  paymentMethod: 'PAYPAL',
  deliveryAddress: 'plic satisfaire aïe',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
