import { Component, signal } from '@angular/core';
import {
  apply,
  debounce,
  disabled,
  email,
  form,
  FormField,
  minLength,
  required,
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

  loginModel = signal<LoginData>({
    name: '',
    email: '',
    password: '',
    age: '',
    address: [],
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    debounce(schemaPath.email, 1000);
    apply(schemaPath, loginSchema);

    minLength(schemaPath.password, 2, { message: 'Too short' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    disabled(schemaPath.age, () => !this.isAgeEditable());
    minLength(schemaPath.age, 2, { message: 'Too young!' });
  });

  submit(event: Event): void {
    event.preventDefault();
    console.log(this.loginModel());
  }

  setEmail() {
    this.loginForm.email().value.set('taras@gmail.com');
  }

  setEmailAndPassword(): void {
    this.loginModel.set({
      name: '',
      email: 'test',
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

  disableName(): void {
    this.loginForm.name().disabled();
  }
}
