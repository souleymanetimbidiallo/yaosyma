export interface IProduct {
  id: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  stockQuantity?: number | null;
  category?: string | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
