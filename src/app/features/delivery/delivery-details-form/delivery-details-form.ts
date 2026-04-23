import { Component, input } from '@angular/core';
import { FormError } from 'src/app/shared/components/form-error/form-error';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import {
  applyWhen,
  FieldTree,
  FormField,
  hidden,
  minLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { DeliveryDetailsFormInterface } from 'src/app/shared/interfaces/forms/delivery-details-form.interface';

export const DeliveryDetailFormSchema = schema<DeliveryDetailsFormInterface>((schema) => {
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
          : undefined,
      );
    },
  );
});

@Component({
  selector: 'app-delivery-details-form',
  imports: [
    FormError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelect,
    FormField,
  ],
  templateUrl: './delivery-details-form.html',
  styleUrl: './delivery-details-form.scss',
})
export class DeliveryDetailsForm {
  readonly deliveryDetailsForm = input.required<FieldTree<DeliveryDetailsFormInterface>>();
}
