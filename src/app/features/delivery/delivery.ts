import { Component, inject, signal } from '@angular/core';
import { apply, form, FormRoot } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AccountForm,
  AccountFormSchema,
} from 'src/app/features/delivery/account-form/account-form';
import { AccountFormInterface } from 'src/app/shared/interfaces/forms/account-from.interface';
import { DeliveryDetailsFormInterface } from 'src/app/shared/interfaces/forms/delivery-details-form.interface';
import {
  DeliveryDetailFormSchema,
  DeliveryDetailsForm,
} from 'src/app/features/delivery/delivery-details-form/delivery-details-form';
import {
  ProductForm,
  ProductFormSchema,
} from 'src/app/features/delivery/product-form/product-form';
import { ProductFormInterface } from 'src/app/shared/interfaces/forms/product-form.interface';

export interface DeliveryForm {
  account: AccountFormInterface;
  deliveryDetails: DeliveryDetailsFormInterface;
  products: ProductFormInterface[];
}

export type DeliveryType = 'home' | 'pickup';
export type DeliveryDay = 'Mon-Fri' | 'Sat-Sun';

@Component({
  selector: 'app-delivery',
  imports: [FormRoot, MatButton, AccountForm, DeliveryDetailsForm, ProductForm],
  templateUrl: './delivery.html',
  styleUrl: './delivery.scss',
})
export class Delivery {
  deliveryFormModel = signal<DeliveryForm>({
    account: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    deliveryDetails: {
      deliveryType: 'pickup',
      address: {
        street: '',
        city: '',
        zip: '',
      },
      deliveryDay: 'Mon-Fri',
      timeSlot: '',
    },
    products: [
      {
        name: null,
        quantity: null,
      },
    ],
  });

  deliveryForm = form(
    this.deliveryFormModel,
    (schemaPath) => {
      apply(schemaPath.account, AccountFormSchema);
      apply(schemaPath.deliveryDetails, DeliveryDetailFormSchema);
      apply(schemaPath.products, ProductFormSchema);
    },
    {
      submission: {
        action: async () => {
          console.log('is valid', this.deliveryForm());
          this.openSnackBar('Form submitted successfully!', 'Close');
        },
      },
    },
  );

  setAccountForm(): void {
    this.deliveryFormModel.update((v) => ({
      ...v,
      account: {
        ...v.account,
        username: 'taras',
        email: 'taras@gmail.com',
        password: '123456',
        confirmPassword: '123456',
      },
    }));
  }

  removeProduct(index: number): void {
    this.deliveryFormModel.update((v) => ({
      ...v,
      products: v.products.filter((_, i) => i !== index),
    }));
  }

  addProduct(): void {
    this.deliveryFormModel.update((v) => ({
      ...v,
      products: [
        ...v.products,
        {
          name: null,
          quantity: null,
        },
      ],
    }));
  }

  private _snackBar = inject(MatSnackBar);
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { verticalPosition: 'top', duration: 2000 });
  }
}
