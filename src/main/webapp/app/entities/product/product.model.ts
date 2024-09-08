import { ICategory } from 'app/entities/category/category.model';
import { ISupplier } from 'app/entities/supplier/supplier.model';

export interface IProduct {
  id: number;
  name?: string | null;
  description?: string | null;
  image?: string | null;
  quantity?: number | null;
  price?: number | null;
  category?: Pick<ICategory, 'id' | 'name'> | null;
  supplier?: Pick<ISupplier, 'id' | 'name'> | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
