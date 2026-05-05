import { Component, inject, OnInit } from '@angular/core';
import { PAYMENT_GATEWAY } from 'src/app/features/abstract-factory-pattern/abstract-factory.services';

@Component({
  selector: 'app-abstract-factory-pattern',
  imports: [],
  templateUrl: './abstract-factory-pattern.html',
  styleUrl: './abstract-factory-pattern.scss',
})
export class AbstractFactoryPattern implements OnInit {
  gateway = inject(PAYMENT_GATEWAY);

  ngOnInit() {
    this.gateway.refound().refund()
    this.gateway.payment().fetchPaymentDetails()
  }
}
