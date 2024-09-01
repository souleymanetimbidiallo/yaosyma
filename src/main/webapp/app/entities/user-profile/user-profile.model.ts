import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface IUserProfile {
  id: number;
  phoneNumber?: string | null;
  address?: string | null;
  birthDate?: dayjs.Dayjs | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewUserProfile = Omit<IUserProfile, 'id'> & { id: null };
