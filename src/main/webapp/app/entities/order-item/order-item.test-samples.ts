import { IOrderItem, NewOrderItem } from './order-item.model';

export const sampleWithRequiredData: IOrderItem = {
  id: 25343,
  quantity: 13167,
  unitPrice: 2895.3,
  totalPrice: 14047.44,
};

export const sampleWithPartialData: IOrderItem = {
  id: 18338,
  quantity: 17624,
  unitPrice: 19710.51,
  totalPrice: 10500.31,
};

export const sampleWithFullData: IOrderItem = {
  id: 7120,
  quantity: 24464,
  unitPrice: 2878.31,
  totalPrice: 30564.27,
};

export const sampleWithNewData: NewOrderItem = {
  quantity: 22745,
  unitPrice: 19333.89,
  totalPrice: 22379,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
