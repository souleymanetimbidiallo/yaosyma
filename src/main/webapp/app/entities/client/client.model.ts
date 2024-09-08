import { IUser } from 'app/entities/user/user.model';

export interface IClient {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  password?: string | null;
  address?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
