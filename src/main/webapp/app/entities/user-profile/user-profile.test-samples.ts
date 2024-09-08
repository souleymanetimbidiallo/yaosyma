import dayjs from 'dayjs/esm';

import { IUserProfile, NewUserProfile } from './user-profile.model';

export const sampleWithRequiredData: IUserProfile = {
  id: 14250,
};

export const sampleWithPartialData: IUserProfile = {
  id: 20979,
  address: 'totalement maigre bè',
  birthDate: dayjs('2024-08-31'),
};

export const sampleWithFullData: IUserProfile = {
  id: 14116,
  phoneNumber: 'grâce à dring',
  address: 'lors de',
  birthDate: dayjs('2024-09-01'),
};

export const sampleWithNewData: NewUserProfile = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
