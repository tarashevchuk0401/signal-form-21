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

export interface DeliveryForm {
  account: AccountForm;
  deliveryDetails: DeliveryDetailsForm;
}

export interface AccountForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type DeliveryType = 'home' | 'pickup';
export type DeliveryDay = 'Mon-Fri' | 'Sat-Sun';

export interface DeliveryDetailsForm {
  deliveryType: DeliveryType;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  deliveryDay: DeliveryDay;
  timeSlot: string;
}

export const AccountFormSchema = schema<AccountForm>((schema) => {
  required(schema.username, { message: 'User name is required' });
  validateAsync(schema.username, {
    params: (ctx) => ctx.value(),

    factory: (params) => {
      const registrationService = inject(RegistrationService);
      return resource({
        params,
        loader: async ({ params }) => {
          return await registrationService.checkUserExists(params as string);
        },
      });
    },

    onSuccess: (result) => {
      return result
        ? {
            kind: 'userExists',
            message: 'Try another name (taras).',
          }
        : undefined;
    },
    onError: () => undefined,
  });

  required(schema.email, { message: 'Email name is required' });

  required(schema.password, { message: 'Password name is required' });
  minLength(schema.password, 3, { message: 'Password must be at least 3 characters long' });

  required(schema.confirmPassword, { message: 'Password confirmation is required' });

  // ERROR. Should display error if password and confirmPassword fields are not equal
  validateTree(schema, (ctx) => {
    return ctx.value().password === ctx.value().confirmPassword
      ? undefined
      : {
          field: ctx.fieldTree.confirmPassword,
          kind: 'confirmationPassword',
          message: 'The entered password must match with the one specified in "Password" field.',
        };
  });
});

export const DeliveryDetailFormSchema = schema<DeliveryDetailsForm>((schema) => {
  required(schema.deliveryType, { message: 'Delivery type is required' });

  hidden(schema.address, (ctx) => ctx.valueOf(schema.deliveryType) === 'pickup');
  required(schema.address.city, { message: 'City is required' });
  required(schema.address.zip, { message: 'Zip is required' });
  minLength(schema.address.zip, 3, { message: 'Zip too short' });
  required(schema.address.street, { message: 'Street is required' });

  required(schema.timeSlot, { message: 'Time slot is required' });
  applyWhen(
    schema,
    (ctx) => ctx.value().deliveryDay === 'Sat-Sun',
    (pathWhenTrue) => {
      validate(pathWhenTrue.timeSlot, (ctx) =>
        ctx.value() !== '10'
          ? {
            kind: 'noTopicSelected',
            message: 'Select another slot. Only 10:00 is available in weekend. ',
          }
          : undefined
      );
    }
  );
});

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
    JsonPipe,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
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
