import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService,
    private router:Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      // tap(evt => {
      //     if (evt instanceof HttpResponse) {
      //         if(evt.body && evt.body.success)
      //             this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
      //     }
      // }),
      catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 ) {
              this.localStorageService.removeLocalStorageValue('token');
              this.localStorageService.removeLocalStorageValue('isLogged');
              this.router.navigate(['/login']);
            }
          }
          return of(err);
      })
    );
  }
}
