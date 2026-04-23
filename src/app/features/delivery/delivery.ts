import { Component, inject, resource, signal } from '@angular/core';
import {
  apply,
  applyWhen,
  form,
  FormField,
  FormRoot,
  hidden,
  minLength,
  required,
  schema,
  validate,
  validateAsync,
  validateTree,
} from '@angular/forms/signals';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormError } from 'src/app/shared/components/form-error/form-error';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { JsonPipe } from '@angular/common';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  AccountForm,
  AccountFormSchema,
} from 'src/app/features/delivery/account-form/account-form';
import { AccountFormInterface } from 'src/app/shared/interfaces/forms/account-from.interface';
import { DeliveryDetailsFormInterface } from 'src/app/shared/interfaces/forms/delivery-details-form.interface';
import { DeliveryDetailFormSchema, DeliveryDetailsForm } from 'src/app/features/delivery/delivery-details-form/delivery-details-form';

export interface DeliveryForm {
  account: AccountFormInterface;
  deliveryDetails: DeliveryDetailsFormInterface;
}

export type DeliveryType = 'home' | 'pickup';
export type DeliveryDay = 'Mon-Fri' | 'Sat-Sun';




@Component({
  selector: 'app-delivery',
  imports: [
    FormRoot,
    MatFormField,
    MatLabel,
    MatInput,
    FormField,
    MatButton,
    FormError,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    AccountForm,
    DeliveryDetailsForm,
  ],
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
  });

  deliveryForm = form(
    this.deliveryFormModel,
    (schemaPath) => {
      apply(schemaPath.account, AccountFormSchema);
      apply(schemaPath.deliveryDetails, DeliveryDetailFormSchema);
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

  private _snackBar = inject(MatSnackBar);
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { verticalPosition: 'top', duration: 2000 });
  }
}
