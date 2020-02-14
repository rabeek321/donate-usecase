import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SchemesComponent } from './schemes/schemes.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'schemes',
    component: SchemesComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutingModule { }
