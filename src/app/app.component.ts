import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Funcionarios', link : '/funcionarios' },
    { label: 'Logout', action: this.logout.bind(this)  },
  ];

  private logout(): void {
    this.authService.logout()
    this.router.navigate(['login']);
  }
  constructor(
    public router: Router,
    private authService: AuthService
    ){

  }

}
