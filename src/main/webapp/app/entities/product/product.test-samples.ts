import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 32224,
  name: 'inventer',
  price: 1111.2,
  stockQuantity: 5663,
};

export const sampleWithPartialData: IProduct = {
  id: 4352,
  name: 'svelte',
  description: "à l'encontre de blablabla",
  price: 21048.97,
  stockQuantity: 5886,
  category: 'extra célébrer après',
};

export const sampleWithFullData: IProduct = {
  id: 26969,
  name: 'résumer hors de',
  description: 'diététiste',
  price: 23714.36,
  stockQuantity: 25073,
  category: 'même si',
};

export const sampleWithNewData: NewProduct = {
  name: 'via secouriste',
  price: 899.7,
  stockQuantity: 12312,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
