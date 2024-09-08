import { IDriver, NewDriver } from './driver.model';

export const sampleWithRequiredData: IDriver = {
  id: 6973,
  firstName: 'Camillien',
  lastName: 'Denis',
  phone: '+33 367162350',
  email: 'Olivier99@yahoo.fr',
  password: 'carrément éviter',
};

export const sampleWithPartialData: IDriver = {
  id: 9531,
  firstName: 'Lucien',
  lastName: 'Jean',
  phone: '+33 402029286',
  email: 'Christelle.Brun@yahoo.fr',
  password: 'manier vroum chez',
};

export const sampleWithFullData: IDriver = {
  id: 18457,
  firstName: 'Adegrine',
  lastName: 'Marchand',
  address: 'psitt parce que',
  phone: '0400287201',
  email: 'Auriane.David@yahoo.fr',
  password: 'conseil d’administration',
};

export const sampleWithNewData: NewDriver = {
  firstName: 'Pierrick',
  lastName: 'Andre',
  phone: '0443265889',
  email: 'Barthelemy.Vincent@hotmail.fr',
  password: 'laver personnel professionnel innombrable',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
