import dayjs from 'dayjs/esm';

import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: 12708,
  paymentDate: dayjs('2024-08-31T12:19'),
  amount: 16629.83,
  paymentMode: 'ONLINE',
  status: 'FAILED',
};

export const sampleWithPartialData: IPayment = {
  id: 4439,
  paymentDate: dayjs('2024-08-31T17:11'),
  amount: 15810.61,
  paymentMode: 'CASH_ON_DELIVERY',
  status: 'FAILED',
};

export const sampleWithFullData: IPayment = {
  id: 716,
  paymentDate: dayjs('2024-08-31T21:19'),
  amount: 15282.39,
  paymentMode: 'CASH_ON_DELIVERY',
  transactionId: 'adorable responsable parlementaire',
  status: 'COMPLETED',
};

export const sampleWithNewData: NewPayment = {
  paymentDate: dayjs('2024-08-31T20:15'),
  amount: 2698.87,
  paymentMode: 'ONLINE',
  status: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
