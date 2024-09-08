import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 5001,
  name: 'badaboum tant que emplir',
  quantity: 9114,
  price: 8926.72,
};

export const sampleWithPartialData: IProduct = {
  id: 29553,
  name: 'de la part de membre de l’équipe cot cot',
  quantity: 12025,
  price: 9004.33,
};

export const sampleWithFullData: IProduct = {
  id: 22439,
  name: 'tisser',
  description: 'affable géométrique',
  image: 'financer',
  quantity: 29153,
  price: 18395.29,
};

export const sampleWithNewData: NewProduct = {
  name: 'groin groin de façon à ce que',
  quantity: 13881,
  price: 66.47,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
