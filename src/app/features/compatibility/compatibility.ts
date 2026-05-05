import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { compatForm } from '@angular/forms/signals/compat';
import { FormField, FormRoot, min, minLength, required } from '@angular/forms/signals';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-compatibility',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    FormRoot,
    FormField,
    MatSlideToggle,
  ],
  templateUrl: './compatibility.html',
  styleUrl: './compatibility.scss',
})
export class Compatibility {
  private readonly fb = inject(FormBuilder);
  public readonly isSignalForm = signal<boolean>(false);

  nameForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    console.log(this.nameForm);
  }

  // <-- Signal Form -->
  compatForm = signal({
    firstName: this.nameForm.controls.firstName.value ?? '',
    lastName: this.nameForm.controls.lastName.value ?? '',
  });

  signalNameForm = compatForm(
    this.compatForm,
    (schemaPath) => {
      required(schemaPath.firstName, { message: 'First name is required' });
      required(schemaPath.lastName, { message: 'Last name is required' });
      minLength(schemaPath.firstName, 3, { message: 'First name must be at least 3 characters' });
      minLength(schemaPath.lastName, 3, { message: 'Last name must be at least 3 characters' });
    },
    {
      submission: {
        action: async () => {
          console.log('is valid', this.signalNameForm().valid());
        },
      },
    },
  );

  public toggleSignalForm(): void {
    this.nameForm.reset();
    this.isSignalForm.set(!this.isSignalForm());
  }
}
