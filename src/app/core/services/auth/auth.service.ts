import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { from, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { HttpClient } from '@angular/common/http';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host = 'http://localhost:3000';
  private loginPath = '/login';
  private userInfoPath = '/user-info';
  public userData$: Observable<{user: SocialUser, isLogged: boolean}> = of({user: null, isLogged: false});

  constructor(
    private router: Router,
    public authService: SocialAuthService,
    public localStorageService: LocalStorageService,
    public http: HttpClient,
    private store: Store<AppState>
  ) {
  }

  signInWithGoogle(): Observable<any> {
    return from(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)).pipe(
      switchMap(user => {
        // if (!user.email.split('@')[1].includes('f2x')) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Debes iniciar sesión con tu cuenta de F2X'
        //   })
        //   return of(false);
        // }

        return ajax.post(this.host + this.loginPath, {idToken: user.idToken});
      }),
      pluck('response')
    );
  }

  signOut() {
    this.authService.signOut().catch(r => {});
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/login']);
  }

  isAuth() {
    const token = this.localStorageService.getLocalStorageValue('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }

  getUserInfo(): Observable<any> {
    return this.http.get(this.host + this.userInfoPath)
  }

}
