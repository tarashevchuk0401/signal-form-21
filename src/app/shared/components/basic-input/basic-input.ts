import { Component, input, model } from '@angular/core';
import { DisabledReason, FormValueControl } from '@angular/forms/signals';
@Component({
  selector: 'app-basic-input',
  template: `
    <div class="basic-input">
      <div>was touched : {{touched()}}</div>
      <input
        type="text"
        [value]="value()"
        (input)="value.set($event.target.value)"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [class.invalid]="invalid()"
        [attr.aria-invalid]="invalid()"
        (blur)="touched.set(true)"
      
      />
    </div>
  `,
})
export class BasicInput implements FormValueControl<string> {
  /** The current input value */
  value = model('');

  touched = model<boolean>(false);

  disabled = input<boolean>(false);
  // disabledReasons = input<readonly DisabledReason[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  // errors = input<readonly ValidationError.WithField[]>([]);
}
