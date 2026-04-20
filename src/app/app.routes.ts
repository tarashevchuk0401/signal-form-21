import { Routes } from '@angular/router';
import { SignUpComponent } from 'src/app/features/sign-up/sign-up.component';
import { Compatibility } from 'src/app/features/compatibility/compatibility';
import { Delivery } from 'src/app/features/delivery/delivery';

export const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'compatibility', component: Compatibility },
  { path: 'delivery', component: Delivery },
];
