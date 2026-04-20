import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { compatForm } from '@angular/forms/signals/compat';
import { FormField, FormRoot } from '@angular/forms/signals';
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
// Use the object syntax for the second argument to include nonNullable
    firstName: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    lastName: ['', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }],
  });

  onSubmit() {
    console.log(this.nameForm);
  }

  // <-- Signal Form -->
  compatForm = signal({
    firstName: this.nameForm.controls.firstName ?? '',
    lastName: this.nameForm.controls.lastName ?? '',
  });

  signalNameForm = compatForm(this.compatForm, {
    submission: {
      action: async () => {
        console.log('Submit', this.signalNameForm().valid());
      },
    },
  });

  public toggleSignalForm(): void {
    this.nameForm.reset();
    this.isSignalForm.set(!this.isSignalForm());
  }
}
