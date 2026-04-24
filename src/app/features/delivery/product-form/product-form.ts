import { Component, input, output } from '@angular/core';
import {
  applyEach,
  FieldTree,
  FormField,
  max,
  min,
  required,
  schema,
} from '@angular/forms/signals';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormError } from 'src/app/shared/components/form-error/form-error';
import { MatButton } from '@angular/material/button';
import { ProductFormInterface } from 'src/app/shared/interfaces/forms/product-form.interface';
import { ProductsTypes } from 'src/app/core/constants/product-types.enum';

export const ProductFormSchema = schema<ProductFormInterface[]>((schema) => {
  applyEach(schema, (item) => {
    required(item.name, { message: 'Product name is required' });
    required(item.quantity, { message: 'Product quantity is required' });

    max(item.quantity, 100, { message: 'Quantity cannot exceed 100' });
    min(item.quantity, 1, { message: 'Quantity cannot be less than 1' });
  });
});

@Component({
  selector: 'app-product-form',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    FormField,
    MatOption,
    MatSelect,
    FormError,
    MatButton,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  public readonly productForm = input.required<FieldTree<ProductFormInterface[]>>();

  public readonly removeProduct = output<number>();
  public readonly addProduct = output<void>();

  readonly productTypes = Object.values(ProductsTypes);
}
