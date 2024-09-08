import { IUser } from 'app/entities/user/user.model';

export interface IDriver {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  password?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewDriver = Omit<IDriver, 'id'> & { id: null };
