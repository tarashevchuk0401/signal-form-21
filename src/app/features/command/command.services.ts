import { Injectable } from '@angular/core';

export interface CommandInterface {
  execute(current: number): number;
  undo(current: number): number;
}

@Injectable({ providedIn: 'root' })
export class Calculator {
  currentValue = 0;
  history: CommandInterface[] = [];

  executeCommand(command: CommandInterface): number {
    this.history.push(command);
    this.currentValue = command.execute(this.currentValue);
    return this.currentValue;
  }

  undoCommand() {
    const last = this.history.pop();
    if (!last) return;

    this.currentValue = last.undo(this.currentValue);
  }
}

export class AddService implements CommandInterface {
  constructor(private value: number) {}

  execute(current: number): number {
    return current + this.value;
  }

  undo(current: number): number {
    return current - this.value;
  }
}

export class SubtractService implements CommandInterface {
  constructor(private value: number) {}

  execute(current: number): number {
    return current - this.value;
  }

  undo(current: number): number {
    return current + this.value;
  }
}
