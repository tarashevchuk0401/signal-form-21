import { Injectable } from '@angular/core';

export interface CommandInterface {
  execute(value: number, current: number): number;
  undo(value: number, current: number): number;
}

export interface HistoryItem {
  operation: string;
  value: number;
}

@Injectable({ providedIn: 'root' })
export class Calculator {
  currentValue = 0;
  history: HistoryItem[] = [];

  executeCommand(command: CommandInterface, value: number): number {
    const operation = command instanceof AddService ? '+' : '-';
    this.history.push({
      operation,
      value,
    });
    return (this.currentValue = command.execute(value, this.currentValue));
  }

  undoCommand() {
    const lastCommand = this.history[this.history.length - 1];

  }
}

export class AddService implements CommandInterface {
  execute(value: number, current: number): number {
    return (current += value);
  }

  undo(value: number, current: number): number {
    return (current -= value);
  }
}

export class SubtractService implements CommandInterface {
  execute(value: number, current: number): number {
    return (current -= value);
  }

  undo(value: number, current: number): number {
    return (current += value);
  }
}
