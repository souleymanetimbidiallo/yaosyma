import { IStore, NewStore } from './store.model';

export const sampleWithRequiredData: IStore = {
  id: 7074,
  name: 'dedans',
};

export const sampleWithPartialData: IStore = {
  id: 546,
  name: 'moderne',
  description: 'âcre quasiment',
};

export const sampleWithFullData: IStore = {
  id: 3331,
  name: 'plouf incognito',
  location: 'aïe',
  description: 'tchou tchouu verser',
};

export const sampleWithNewData: NewStore = {
  name: 'demain sauf foule',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
