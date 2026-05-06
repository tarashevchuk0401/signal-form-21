import { Component, inject, OnInit } from '@angular/core';
import {
  AddService,
  Calculator,
  CommandInterface,
  SubtractService,
} from 'src/app/features/command/command.services';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-command',
  imports: [MatButton, JsonPipe],
  templateUrl: './command.html',
  styleUrl: './command.scss',
})
export class Command {
  calculator = inject(Calculator);

  calculate(command: string) {
    const operations: Record<string, CommandInterface> = {
      '+': new AddService(),
      '-': new SubtractService(),
    };

    this.calculator.executeCommand(operations[command], 10);

    console.log(this.calculator.currentValue);
  }
}
