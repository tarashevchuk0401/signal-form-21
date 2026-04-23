import { Component, inject, input, resource } from '@angular/core';
import { FormError } from 'src/app/shared/components/form-error/form-error';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  FieldTree,
  FormField,
  minLength,
  required,
  schema,
  validateAsync,
  validateTree,
} from '@angular/forms/signals';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { AccountFormInterface } from 'src/app/shared/interfaces/forms/account-from.interface';

export const AccountFormSchema = schema<AccountFormInterface>((schema) => {
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

@Component({
  selector: 'app-account-form',
  imports: [FormError, MatFormField, MatInput, MatLabel, FormField],
  templateUrl: './account-form.html',
  styleUrl: './account-form.scss',
})
export class AccountForm {
  readonly accountForm = input.required<FieldTree<AccountFormInterface>>();
}
