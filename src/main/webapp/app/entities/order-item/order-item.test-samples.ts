import { IOrderItem, NewOrderItem } from './order-item.model';

export const sampleWithRequiredData: IOrderItem = {
  id: 24462,
  quantity: 16489,
  unitPrice: 6523.07,
  totalPrice: 1706.06,
};

export const sampleWithPartialData: IOrderItem = {
  id: 19541,
  quantity: 22058,
  unitPrice: 12416.65,
  totalPrice: 16722,
};

export const sampleWithFullData: IOrderItem = {
  id: 23644,
  quantity: 24694,
  unitPrice: 20937.36,
  totalPrice: 22821.63,
};

export const sampleWithNewData: NewOrderItem = {
  quantity: 19290,
  unitPrice: 26797.15,
  totalPrice: 24448.36,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
