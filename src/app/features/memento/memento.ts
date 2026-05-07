import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MementoCalculatorService } from 'src/app/features/memento/memento-calculator.service';

@Component({
  selector: 'app-memento',
  imports: [
    FormsModule,
    JsonPipe,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './memento.html',
  styleUrl: './memento.scss',
})
export class Memento {
  calculatorMemento = inject(MementoCalculatorService);
  dynamicValue = new FormControl<number>(0);

  add(): void {
    this.calculatorMemento.add(Number(this.dynamicValue.value ?? 0));
    this.dynamicValue.setValue(0);
  }

  subtract(): void {
    this.calculatorMemento.subtract(Number(this.dynamicValue.value ?? 0));
    this.dynamicValue.setValue(0);
  }

  undo(): void {
    this.calculatorMemento.undo();
  }
}
