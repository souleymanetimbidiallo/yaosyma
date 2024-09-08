import { ISupplier, NewSupplier } from './supplier.model';

export const sampleWithRequiredData: ISupplier = {
  id: 2186,
  name: 'reproduire bon',
  phone: '+33 672572487',
  email: 'Abelin79@yahoo.fr',
};

export const sampleWithPartialData: ISupplier = {
  id: 11056,
  name: 'puisque',
  description: 'jusqu’à ce que',
  phone: '0415618129',
  email: 'Hubert_Poirier67@hotmail.fr',
  image: 'avant réfléchir diplomate',
};

export const sampleWithFullData: ISupplier = {
  id: 23853,
  name: 'deçà de manière à ce que',
  description: 'juger pas mal pendant',
  address: 'résister juriste terriblement',
  phone: '0190975813',
  email: 'Francoise.Robin55@hotmail.fr',
  image: 'ressusciter',
};

export const sampleWithNewData: NewSupplier = {
  name: 'vide',
  phone: '0532266212',
  email: 'Nestor.Fabre99@hotmail.fr',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
