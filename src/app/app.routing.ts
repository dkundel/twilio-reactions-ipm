import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MobileComponent } from './mobile/mobile.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'mobile', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mobile', component: MobileComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);