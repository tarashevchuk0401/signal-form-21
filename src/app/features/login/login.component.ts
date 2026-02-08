import { Component, signal } from '@angular/core';
import {
  apply,
  debounce,
  disabled,
  email,
  form,
  FormField,
  hidden,
  minLength,
  submit,
} from '@angular/forms/signals';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { loginSchema } from 'src/app/shared/validation/login-schema';
import { MyCustomInput } from 'src/app/shared/components/my-custom-input/my-custom-input';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatLabel, MatInput, FormField, MatButton, MatError, MyCustomInput],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isAgeEditable = signal(false);
  isNameDisabled = signal(false);

  loginModel = signal<LoginData>({
    name: '',
    email: '',
    password: '',
    age: '',
    address: [],
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    apply(schemaPath, loginSchema);

    minLength(schemaPath.password, 2, { message: 'Too short' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    disabled(schemaPath.age, () => !this.isAgeEditable());
    minLength(schemaPath.age, 2, { message: 'Too young!' });
    disabled(schemaPath.name, () => this.isNameDisabled());
  });

  async submit(event: Event) {
    event.preventDefault();

    await submit(this.loginForm, async (form) => {
      // 1. At this point all fields are already marked as touched
      // 2. If form is invalid - this function will NOT be called
      // 3. form().submitting() === true during execution

      const response = await setTimeout(() => console.log('Submit', this.loginForm()), 1500);
      console.log(response);

      return undefined; // success
    });
  }

  setEmail() {
    this.loginForm.email().value.set('taras@gmail.com');
  }

  setEmailAndPassword(): void {
    this.loginModel.set({
      name: '',
      email: 'test@dsdf',
      password: '123456',
      age: '1',
      address: [],
    });
  }

  toggleAge(): void {
    this.isAgeEditable.update((v) => !v);
  }

  addAddress(): void {
    this.loginForm.address().value.update((v) => [...v, '']);
  }

  setName(): void {
    this.loginModel.update((v) => ({ ...v, name: 'Taras' }));
  }

  toggleName(): void {
    this.isNameDisabled.update((v) => !v);
  }

}
