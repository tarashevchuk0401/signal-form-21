import { Component, signal } from '@angular/core';
import { debounce, email, form, FormField, required } from '@angular/forms/signals';
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
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    debounce(schemaPath.email, 300);
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
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
    });
  }
}
