import { Component, inject } from '@angular/core';
import { OrderStateService } from 'src/app/features/state/order-state.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-state',
  imports: [MatButton],
  templateUrl: './state.html',
  styleUrl: './state.scss',
})
export class State {
  orderStateService = inject(OrderStateService);

  pay(): void {
    this.orderStateService.pay();
  }
  ship(): void {
    this.orderStateService.ship();
  }
  deliver(): void {
    this.orderStateService.deliver();
  }
  cancel(): void {
    this.orderStateService.cancel();
  }
}
