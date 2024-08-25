import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: 6053,
  title: 'pff',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-08-24T19:27'),
};

export const sampleWithPartialData: IPost = {
  id: 17559,
  title: 'gens divinement',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-08-24T15:50'),
};

export const sampleWithFullData: IPost = {
  id: 23532,
  title: 'sortir loufoque',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-08-24T17:52'),
};

export const sampleWithNewData: NewPost = {
  title: 'rentrer',
  content: '../fake-data/blob/hipster.txt',
  date: dayjs('2024-08-24T23:38'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
