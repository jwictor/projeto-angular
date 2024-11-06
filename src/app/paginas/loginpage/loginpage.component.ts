import { Component, inject, OnDestroy } from '@angular/core';
import { PoPageLoginComponent, PoPageLoginModule } from '@po-ui/ng-templates';
import { LoginService } from '../../services/login.service';
import { LoginData } from '../../classes/login';
import { Router } from '@angular/router';
import { PoLoadingModule, PoNotificationService } from '@po-ui/ng-components';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../classes/profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [PoPageLoginModule,PoLoadingModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent implements OnDestroy {

  private loginService = inject(LoginService)
  private loginData!: LoginData;
  private router = inject(Router);
  private notify = inject(PoNotificationService);
  private profileService = inject(ProfileService);
  private profile$ = this.profileService.getProfile();
  private profile: Profile = new Profile();
  private sub = new Subscription();

  public isHiddenLoading: boolean = true;

  constructor(){
    const subProfile = this.profile$.subscribe({next: value => this.profile = value});
    this.sub.add(subProfile);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  public confirmLogin(loginPage: PoPageLoginComponent){

    this.isHiddenLoading = false;

    this.loginService.sendLogin(loginPage.login,loginPage.password)
    .subscribe({
      next: value => {

         let loginNow: number  = Date.now();
         this.loginData = value;
         
         localStorage.setItem('access_token', this.loginData.access_token);
         localStorage.setItem('refresh_token', this.loginData.refresh_token);
         localStorage.setItem('expires_in', (loginNow + (this.loginData.expires_in * 1000)).toString());
         localStorage.setItem('username', loginPage.login);

        this.profileService.loadprofile(loginPage.login);
        
        console.log('expiress', this.loginData.expires_in)
        
         this.isHiddenLoading = true;
         this.router.navigate(['home']);
      },
      error: err => {
        console.log('erro', err);
        let msgerror: string;
        err.error.code === 401 ? msgerror = 'Login invalido!!' : msgerror = err.error.message;
        this.notify.error({message: msgerror});
        this.isHiddenLoading = true;
      },
      complete: () => {},
    })

  }
}
