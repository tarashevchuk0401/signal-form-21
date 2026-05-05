import { Component, inject, OnInit } from '@angular/core';
import {
  PaymentService,
  PayPalEngine,
  StripeEngine,
} from 'src/app/features/bridge/bridge.services';

@Component({
  selector: 'app-bridge',
  imports: [],
  templateUrl: './bridge.html',
  styleUrl: './bridge.scss',
})
export class Bridge implements OnInit {

  private paymentService =inject(PaymentService);

  ngOnInit() {
    this.paymentService.setProvider('paypal');
    this.paymentService.pay();
  }
}
