import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  let loginService = inject(LoginService);
  let username = localStorage.getItem('username');
  let access_token = localStorage.getItem('access_token');
  let refresh_token = localStorage.getItem('refresh_token');
  let expires_in = localStorage.getItem('expires_in');


  if(!username) {
    router.navigate(['login']);
    return true;
  }

  if(typeof expires_in === 'string'){
    if(Number(expires_in) > Date.now()){
     return true;
    }
  }

  if(typeof refresh_token === 'string'){
    loginService.refreshLogin(refresh_token)
    .subscribe({
      next: value => {
        localStorage.setItem('access_token', value.access_token);
        localStorage.setItem('refresh_token', value.refresh_token);
        localStorage.setItem('expires_in',(value.expiress_in * 1000 + Date.now()).toString());
      },
      error: err => {
        localStorage.clear();
        router.navigate(['login']);
      },
      complete: () => {}
    })
  }

  return true;
};