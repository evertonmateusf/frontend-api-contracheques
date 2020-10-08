import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {path: '', component: FuncionariosComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'login', component: LoginComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
