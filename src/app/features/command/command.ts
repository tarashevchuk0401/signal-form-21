import { Component, inject, OnInit } from '@angular/core';
import {
  AddService,
  Calculator,
  CommandInterface,
  SubtractService,
} from 'src/app/features/command/command.services';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { OperationsList } from 'src/app/features/command/operationsList';

@Component({
  selector: 'app-command',
  imports: [MatButton, JsonPipe],
  templateUrl: './command.html',
  styleUrl: './command.scss',
})
export class Command {
  calculator = inject(Calculator);
  operationsList = OperationsList;

  calculate(command: string) {
    this.calculator.executeCommand(this.operationsList[command], 10);
  }

  undo(): void {
    this.calculator.undoCommand();
  }
}
