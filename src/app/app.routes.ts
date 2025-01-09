import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInByNumberComponent } from './authenticationPages/sign-in-by-number/sign-in-by-number.component';
import { EnterDetailsPageComponent } from './authenticationPages/enter-details-page/enter-details-page.component';
import { CreatePasswordComponent } from './authenticationPages/create-password/create-password.component';
import { SignInCodeComponent } from './authenticationPages/sign-in-code/sign-in-code.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },{
    path : 'signInByNumber',
    component : SignInByNumberComponent
  },{
    path : 'enterDetails',
    component : EnterDetailsPageComponent
  },{
    path : 'createPassword',
    component : CreatePasswordComponent
  },{
    path : 'signInByCode',
    component : SignInCodeComponent
  }
];
