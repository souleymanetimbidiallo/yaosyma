import dayjs from 'dayjs/esm';

import { IUserProfile, NewUserProfile } from './user-profile.model';

export const sampleWithRequiredData: IUserProfile = {
  id: 16482,
};

export const sampleWithPartialData: IUserProfile = {
  id: 11471,
  phoneNumber: 'repentir',
  address: 'quant à population du Québec actionnaire',
};

export const sampleWithFullData: IUserProfile = {
  id: 29200,
  phoneNumber: 'bang habile',
  address: 'intrépide en dedans de triathlète',
  birthDate: dayjs('2024-08-31'),
};

export const sampleWithNewData: NewUserProfile = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
