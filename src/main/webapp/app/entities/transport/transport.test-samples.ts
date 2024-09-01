import dayjs from 'dayjs/esm';

import { ITransport, NewTransport } from './transport.model';

export const sampleWithRequiredData: ITransport = {
  id: 650,
};

export const sampleWithPartialData: ITransport = {
  id: 29767,
  vehicleType: 'passablement comme',
  driverName: 'quelquefois plouf',
  trackingNumber: 'du fait que',
};

export const sampleWithFullData: ITransport = {
  id: 12184,
  vehicleType: 'à la merci',
  driverName: 'au-dessous bon',
  driverPhone: 'rudement',
  trackingNumber: 'sus ci de peur que',
  status: 'IN_TRANSIT',
  estimatedDeliveryTime: dayjs('2024-08-31T20:35'),
};

export const sampleWithNewData: NewTransport = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
