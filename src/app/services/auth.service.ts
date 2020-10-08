import { AuthDto } from '../models/authDto';
import { StorageService } from './storage.service';
import { LocalUserDto } from '../models/localUser.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthService {
  constructor(
    public http: HttpClient,
    public storage: StorageService) {

  }
  authenticate(creds: AuthDto) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    const user: LocalUserDto = {
      token: tok
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }


}
