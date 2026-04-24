import { ProductsTypes } from 'src/app/core/constants/product-types.enum';

export interface ProductFormInterface {
  name: ProductsTypes | null;
  quantity: number | null;
}
