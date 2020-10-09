import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDto } from 'src/app/models/authDto';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  auth: AuthDto;
  form: FormGroup;
  isHideLoading: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {
    this.auth = {
      email: 'everton.mfernandes@gmail.com',
      senha: '1234',
    };
    this.form = this.formBuilder.group({
      email: ['everton.mfernandes@gmail.com', [Validators.required]],
      senha: ['1234', [Validators.required, Validators.minLength(4)]],
    });
    this.isHideLoading = true;
  }
  ngOnInit(): void {
  }


  logar(): void {
    this.isHideLoading = false;
    this.authService.authenticate(this.form.value)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['']);
        this.isHideLoading = true;
      },
        error => {
          let message = 'Erro ao fazer requisição ao servidor.';
          this.isHideLoading = true;
          if (error.error) {
            message = JSON.parse(error.error).message;
          } else if (error.status === 401) {
            message = 'Usuário e senha inválidos';
          }
          this.poNotification.error(message);
          this.authService.logout();
          console.log(error);
        });
  }

}
