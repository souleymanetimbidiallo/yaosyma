import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: 10149,
  name: 'au défaut de pis quand',
  handle: 'raconter',
};

export const sampleWithPartialData: IBlog = {
  id: 15052,
  name: 'lunatique',
  handle: 'complètement vaste',
};

export const sampleWithFullData: IBlog = {
  id: 30923,
  name: 'lâcher ça tranquille',
  handle: 'déclencher',
};

export const sampleWithNewData: NewBlog = {
  name: 'à partir de outre',
  handle: 'parmi',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
