import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '244e98cb-8c99-4daf-bf62-cbb2313ffd62',
};

export const sampleWithPartialData: IAuthority = {
  name: '814aac0b-c6d5-466f-93aa-ab5e37f9946c',
};

export const sampleWithFullData: IAuthority = {
  name: 'b98d773e-d2c0-40c1-8706-160c31dede00',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
