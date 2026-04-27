import { Routes } from '@angular/router';
import { SignUpComponent } from 'src/app/features/sign-up/sign-up.component';
import { Compatibility } from 'src/app/features/compatibility/compatibility';
import { Delivery } from 'src/app/features/delivery/delivery';
import { FactoryPattern } from 'src/app/features/factory-pattern/factory-pattern';

export const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'compatibility', component: Compatibility },
  { path: 'delivery', component: Delivery },
  { path: 'factory', component: FactoryPattern },
];
