export interface ISupplier {
  id: number;
  name?: string | null;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  image?: string | null;
}

export type NewSupplier = Omit<ISupplier, 'id'> & { id: null };
