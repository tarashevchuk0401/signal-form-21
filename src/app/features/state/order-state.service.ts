import { Injectable, signal } from '@angular/core';
import { OrderState } from 'src/app/features/state/order-state.enum';

export interface OrderStateInterface {
  pay(): void;
  ship(): void;
  deliver(): void;
  cancel(): void;

  canPay: boolean;
  canShip: boolean;
  canDeliver: boolean;
  canCancel: boolean;
}

export class BaseOrderState {
  pay() {
    console.log('Action Forbidden');
  }

  ship(): void {
    console.log('Action Forbidden');
  }
  deliver(): void {
    console.log('Action Forbidden');
  }

  cancel() {
    console.log('Action forbidden');
  }

  canPay = false;
  canShip = false;
  canDeliver = false;
  canCancel = false;
}

export class NewOrderState extends BaseOrderState implements OrderStateInterface {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private context: OrderStateService) {
    super();
  }

  override pay() {
    console.log('payed successfully');
    this.context.setState(new PayedOrderState(this.context));
    this.context.orderStatus.set(OrderState.PAID);
  }

  override cancel() {
    console.log('cancelled');
    this.context.setState(new CanceledOrderState(this.context));
    this.context.orderStatus.set(OrderState.CANCELLED);
  }

  override canPay = true;
  override canCancel = true;
}

export class PayedOrderState extends BaseOrderState implements OrderStateInterface {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private context: OrderStateService) {
    super();
  }

  override cancel() {
    console.log('cancelled');
    this.context.setState(new CanceledOrderState(this.context));
    this.context.orderStatus.set(OrderState.CANCELLED);
  }

  override ship(): void {
    console.log('Shipped');
    this.context.setState(new ShippedOrderState(this.context));
    this.context.orderStatus.set(OrderState.SHIPPED);
  }

  override canShip = true;
  override canCancel = true;
}

export class ShippedOrderState extends BaseOrderState implements OrderStateInterface {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private context: OrderStateService) {
    super();
  }

  override deliver(): void {
    console.log('Delivered');
    this.context.setState(new DeliveredOrderState(this.context));
    this.context.orderStatus.set(OrderState.DELIVERED);
  }

  override canDeliver = true;
}

export class DeliveredOrderState extends BaseOrderState implements OrderStateInterface {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private context: OrderStateService) {
    super();
  }
}

export class CanceledOrderState extends BaseOrderState implements OrderStateInterface {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private context: OrderStateService) {
    super();
  }
}

@Injectable({ providedIn: 'root' })
export class OrderStateService {
  orderState: OrderStateInterface = new NewOrderState(this);
  orderStatus = signal<OrderState>(OrderState.NEW);

  pay(): void {
    this.orderState.pay();
  }

  ship(): void {
    this.orderState.ship();
  }

  deliver(): void {
    this.orderState.deliver();
  }

  cancel(): void {
    this.orderState.cancel();
  }

  setState(state: OrderStateInterface) {
    this.orderState = state;
  }
}
