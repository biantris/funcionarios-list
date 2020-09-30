import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardFuncionariosComponent } from './dashboard-funcionarios/dashboard-funcionarios.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardFuncionariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
