import { Component, inject, resource, signal } from '@angular/core';
import {
  apply,
  form,
  FormField,
  FormRoot, minLength,
  required,
  schema,
  validateAsync,
  validateHttp,
  validateTree,
} from '@angular/forms/signals';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormError } from 'src/app/shared/components/form-error/form-error';
import { SignUpDto } from 'src/app/shared/interfaces/sign-up.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { JsonPipe } from '@angular/common';

export interface DeliveryForm {
  account: AccountForm;
}

export interface AccountForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  ///FIX
  validateTree(schema, (ctx) => {
    return ctx.value().password === ctx.value().confirmPassword
      ? undefined
      : {
          field: ctx.fieldTree.confirmPassword, // assign the error to the second password field
          kind: 'confirmationPassword',
          message: 'The entered password must match with the one specified in "Password" field.',
        };
  });
});

@Component({
  selector: 'app-delivery',
  imports: [FormRoot, MatFormField, MatLabel, MatInput, FormField, MatButton, FormError, JsonPipe],
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
  });

  deliveryForm = form(
    this.deliveryFormModel,
    (schemaPath) => {
      apply(schemaPath.account, AccountFormSchema);
    },
    {
      submission: {
        action: async () => {
          console.log('is valid', this.deliveryForm().valid());
          this.openSnackBar('Form submitted successfully!', 'Close');
        },
      },
    },
  );

  private _snackBar = inject(MatSnackBar);
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { verticalPosition: 'top', duration: 2000 });
  }
}
