import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const localUser = this.storage.getLocalUser();

    const N = API_CONFIG.baseUrl.length;
    const requestToAPI = req.url.substring(0, N) === API_CONFIG.baseUrl;

    if (localUser && requestToAPI) {
      const header = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localUser.token,
      };
      const headers = new HttpHeaders(header);
      const authReq = req.clone({ headers });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
