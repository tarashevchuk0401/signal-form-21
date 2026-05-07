import { Component, inject } from '@angular/core';
import {
  AddService,
  Calculator,
  CommandInterface,
  SubtractService,
} from 'src/app/features/command/command.services';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-command',
  imports: [MatButton, JsonPipe, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './command.html',
  styleUrl: './command.scss',
})
export class Command {
  calculator = inject(Calculator);
  dynamicValue = new FormControl<number>(0);

  calculate(command: string) {
    const operations: Record<string, (value: number) => CommandInterface> = {
      '+': (value) => new AddService(+value),
      '-': (value) => new SubtractService(+value),
    };
    const value = this.dynamicValue.value ?? 0;
    const cmd = operations[command](value);

    this.calculator.executeCommand(cmd);
  }

  undo(): void {
    this.calculator.undoCommand();
  }
}
