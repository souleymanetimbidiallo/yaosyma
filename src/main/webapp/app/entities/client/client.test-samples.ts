import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 9033,
  firstName: 'Hortense',
  lastName: 'Durand',
  email: 'Elodie_Moulin30@gmail.com',
  phone: '0478507215',
  password: 'très',
  address: 'pourvu que',
};

export const sampleWithPartialData: IClient = {
  id: 30210,
  firstName: 'Évangéline',
  lastName: 'Bernard',
  companyName: 'de sorte que',
  email: 'Marcelin_Francois@yahoo.fr',
  phone: '+33 750245214',
  password: 'chef',
  address: 'pff',
};

export const sampleWithFullData: IClient = {
  id: 21757,
  firstName: 'Lambert',
  lastName: 'Dubois',
  companyName: 'oups',
  email: 'Moise61@gmail.com',
  phone: '+33 683549032',
  password: 'pendant que communauté étudiante confronter',
  address: 'efficace',
};

export const sampleWithNewData: NewClient = {
  firstName: 'Angadrême',
  lastName: 'Martinez',
  email: 'Agathon84@hotmail.fr',
  phone: '0597326500',
  password: 'résoudre',
  address: 'lunatique',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
