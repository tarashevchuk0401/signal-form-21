import { Injectable } from '@angular/core';

export class CalculatorHistory {
  constructor(public readonly state: number) {}
}

@Injectable({ providedIn: 'root' })
export class MementoCalculatorService {
  currentValue = 0;
  history: CalculatorHistory[] = [];

  add(value: number): void {
    this.history.push(new CalculatorHistory(this.currentValue));
    this.currentValue += value;
  }

  subtract(value: number): void {
    this.history.push(new CalculatorHistory(this.currentValue));
    this.currentValue -= value;
  }

  undo(): void {
    const lastState = this.history.pop();
    this.currentValue = lastState?.state ?? 0;
  }
}
