import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-my-custom-input',
  imports: [],
  templateUrl: './my-custom-input.html',
  styleUrl: './my-custom-input.scss',
})
export class MyCustomInput implements FormValueControl<string> {
  // Only required field
  readonly value = model<string>('');

  // Optional - Field will automatically bind if they exist
  readonly disabled = input<boolean>(false);
  // readonly errors = input<ValidationError[]>([]);
  touched = model<boolean>(false);
}
