import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateRoutingModule } from './donate-routing.module';
import { HomeComponent } from './home/home.component';
import { SchemesComponent } from './schemes/schemes.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [HomeComponent, SchemesComponent, PaymentComponent],
  imports: [
    CommonModule,
    DonateRoutingModule
  ]
})
export class DonateModule { }
