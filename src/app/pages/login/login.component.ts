import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDto } from 'src/app/models/authDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  auth: AuthDto;
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.auth =  {
      email : 'everton.mfernandes@gmail.com',
      senha : '1234',
    };
    this.form = this.formBuilder.group({
      email: ['everton.mfernandes@gmail.com', [Validators.required]],
      senha: ['1234' , [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void {
  }


  logar(): void {
    this.authService.authenticate(this.form.value)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['']);
      },
        error => {
          this.authService.logout();
          console.log(error);
    });
  }

}
