import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { EXPIRATION_TIME, MOCK_USER } from '../constants';
import { LoginRequest } from '../models/login-request';
import { SignUpRequest } from '../models/sign-up-request';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  private changeEvent!: Subscription;
  public currentUser?: UserDto;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.changeEvent = this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd || event instanceof NavigationStart) {
          console.log(event);
        }
      });
    }

  ngOnDestroy(): void {
    this.changeEvent.unsubscribe();
  }

  getUser() : Observable<UserDto> {
    return this.http.get('http://localhost:8080/access', {headers: {'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
  }

  login(loginRequest: LoginRequest) : Observable<UserDto>{
    return this.http.post('http://localhost:8080/login', loginRequest)
      .pipe(tap(res => this.setSession(res)));
  }

  signup(signUpRequest: SignUpRequest) : Observable<UserDto>{
    return this.http.post('http://localhost:8080/register', signUpRequest)
    .pipe(tap(res => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = undefined;
  }

  canActivate() : boolean {
    if(this.isLoggedIn()) {
      return true;
    }
    this.logout();
    this.router.navigateByUrl('/login');
    return false;
  }

  isLoggedIn() : boolean {
    return localStorage.getItem('token') != undefined;
  }

  private setSession(userDto: UserDto) {
    if(userDto.accessToken) {
      this.currentUser = userDto;
      localStorage.setItem('token', userDto.accessToken);
      setTimeout(() => this.logout, EXPIRATION_TIME);
    }
  }
}
