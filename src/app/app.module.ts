import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { StorageService } from './services/storage.service';
import { FuncionarioService } from './services/funcionario.service';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { AuthService } from './services/auth.service';
import { FormBuilder, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    FormsModule,
    PoTemplatesModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [AuthService,
    FuncionarioService,
    StorageService,
    FormBuilder,
    AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
