import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateRoutingModule } from './donate-routing.module';
import { HomeComponent } from './home/home.component';
import { SchemesComponent } from './schemes/schemes.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';

@NgModule({
  declarations: [HomeComponent, SchemesComponent, PaymentComponent],
  imports: [
    CommonModule,
    DonateRoutingModule,
    SharedModule,
    PrimengModule
  ]
})
export class DonateModule { }
