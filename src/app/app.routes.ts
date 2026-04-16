import { Routes } from '@angular/router';
import { SignUpComponent } from 'src/app/features/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'sign-up', component: SignUpComponent },
];
