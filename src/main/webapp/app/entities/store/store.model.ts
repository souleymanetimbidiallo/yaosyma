import { IUser } from 'app/entities/user/user.model';

export interface IStore {
  id: number;
  name?: string | null;
  location?: string | null;
  description?: string | null;
  owner?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewStore = Omit<IStore, 'id'> & { id: null };
