import { Component, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss',
  imports: [JsonPipe],
})
export class FormError<T> {
  readonly fieldRef = input.required<FieldTree<T>>();
}
