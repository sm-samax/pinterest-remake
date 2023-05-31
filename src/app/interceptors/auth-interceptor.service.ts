import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token');

    console.log('Intercepting request...');

    if(accessToken) {
      const clone = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(clone);
    }

    return next.handle(req);
  }
}
