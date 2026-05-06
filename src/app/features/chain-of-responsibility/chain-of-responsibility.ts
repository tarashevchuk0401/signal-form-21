import { Component, inject, OnInit } from '@angular/core';
import { NotificationChain } from 'src/app/features/chain-of-responsibility/chain-of-responsibilities';

@Component({
  selector: 'app-chain-of-responsibility',
  imports: [],
  templateUrl: './chain-of-responsibility.html',
  styleUrl: './chain-of-responsibility.scss',
})
export class ChainOfResponsibility implements OnInit{
  notificationChain = inject(NotificationChain);

  ngOnInit() {
    this.notificationChain.send('Hello')
  }
}

