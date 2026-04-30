import { Routes } from '@angular/router';
import { SignUpComponent } from 'src/app/features/sign-up/sign-up.component';
import { Compatibility } from 'src/app/features/compatibility/compatibility';
import { Delivery } from 'src/app/features/delivery/delivery';
import { FactoryPattern } from 'src/app/features/factory-pattern/factory-pattern';
import { AbstractFactoryPattern } from 'src/app/features/abstract-factory-pattern/abstract-factory-pattern';
import { Bridge } from 'src/app/features/bridge/bridge';

export const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'compatibility', component: Compatibility },
  { path: 'delivery', component: Delivery },
  { path: 'factory', component: FactoryPattern },
  { path: 'abstract-factory', component: AbstractFactoryPattern },
  { path: 'bridge', component: Bridge },
];
