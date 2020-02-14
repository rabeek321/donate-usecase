import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('../app/components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('../app/components/donate/donate.module').then(m => m.DonateModule)
  },
  {
    path: '',
    redirectTo: 'donate',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
