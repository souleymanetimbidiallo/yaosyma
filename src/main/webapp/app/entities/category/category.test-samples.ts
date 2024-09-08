import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 1932,
  name: 'assez',
};

export const sampleWithPartialData: ICategory = {
  id: 32360,
  name: 'éloigner diététiste déposer',
};

export const sampleWithFullData: ICategory = {
  id: 7708,
  name: 'ôter jeune enfant si',
};

export const sampleWithNewData: NewCategory = {
  name: 'aux alentours de miam',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
