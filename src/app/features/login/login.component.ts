import { Component, signal } from '@angular/core';
import {
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
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatLabel, MatInput, FormField, MatButton, MatError, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isAgeEditable = signal(false);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
    age: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    debounce(schemaPath.email, 1000);
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
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
      email: 'test',
      password: '123456',
      age: '1',
    });
  }

  toggleAge(): void {
    this.isAgeEditable.update((v) => !v);
  }
}
