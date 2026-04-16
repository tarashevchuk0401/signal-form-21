import { Component, inject, signal } from '@angular/core';
import {
  apply,
  applyEach,
  applyWhen,
  debounce,
  disabled,
  email,
  form,
  FormField,
  FormRoot,
  hidden,
  min,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { signUpSchema } from 'src/app/shared/validation/sign-up-schema';
import { MyCustomInput } from 'src/app/shared/components/my-custom-input/my-custom-input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpDto } from 'src/app/shared/interfaces/sign-up.dto';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormField,
    MatButton,
    MatError,
    MyCustomInput,
    MatButtonToggle,
    MatSlideToggle,
    FormRoot,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  readonly isAgeEditable = signal(false);
  readonly isNameDisabled = signal(false);

  // Form model
  signUpModel = signal<SignUpDto>({
    name: '',
    email: '',
    password: '',
    age: '',
    address: [],
  });

  // Form initialization
  signUpForm = form(
    this.signUpModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });

      minLength(schemaPath.password, 2, { message: 'Too short' });
      min(schemaPath.age, 18, { message: 'Too young!' });
      email(schemaPath.email, { message: 'Enter a valid email address' });
      disabled(schemaPath.age, () => !this.isAgeEditable());
      disabled(schemaPath.name, () => this.isNameDisabled());
      // apply(schemaPath, signUpSchema);
    },
    {
      submission: {
        action: async () => {
          await setTimeout(() => {
            console.log('Submit', this.signUpForm());
            this.openSnackBar('Form submitted successfully!', 'Close');
          });

          this.resetForm();

          return undefined;
        },
      },
    },
  );

  setEmailAndPassword(): void {
    this.signUpModel.update((v) => ({ ...v, email: 'taras@gmail.com', password: '123456' }));
  }

  addAddress(): void {
    this.signUpForm.address().value.update((v) => [...v, '']);
  }

  toggleName(): void {
    this.isNameDisabled.update((v) => !v);
  }

  toggleAge(): void {
    this.isAgeEditable.update((v) => !v);
  }

  async submit(event: Event) {
    event.preventDefault();

    await submit(this.signUpForm, async () => {
      // 1. At this point all fields are already marked as touched
      // 2. If form is invalid - this function will NOT be called
      // 3. form().submitting() === true during execution

      await setTimeout(() => {
        console.log('Submit', this.signUpForm());
        this.openSnackBar('Form submitted successfully!', 'Close');
      });

      this.resetForm();

      return undefined;
    });
  }

  private _snackBar = inject(MatSnackBar);
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { verticalPosition: 'top', duration: 2000 });
  }

  private resetForm() {
    this.signUpForm().reset();
    this.signUpModel.set({
      name: '',
      email: '',
      password: '',
      age: '',
      address: [],
    });
  }
}
