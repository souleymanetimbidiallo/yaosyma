import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 4769,
  name: 'parer',
};

export const sampleWithPartialData: ITag = {
  id: 1943,
  name: 'refaire personnel circulaire',
};

export const sampleWithFullData: ITag = {
  id: 10791,
  name: 'comment',
};

export const sampleWithNewData: NewTag = {
  name: 'ah miam',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
