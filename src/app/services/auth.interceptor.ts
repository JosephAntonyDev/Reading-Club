import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users_Service } from './users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private usersService: Users_Service) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (typeof window !== 'undefined') {
        const token = this.usersService.getToken();
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(cloned);
        }
      }
      return next.handle(req);
    }
  }
