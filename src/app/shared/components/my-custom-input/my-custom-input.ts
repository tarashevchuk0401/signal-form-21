import { Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-my-custom-input',
  imports: [],
  templateUrl: './my-custom-input.html',
  styleUrl: './my-custom-input.scss',
})
export class MyCustomInput implements FormValueControl<string> {
  // Only required field
  readonly value = model<string>('');

  touched = model<boolean>(false);

  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
}
