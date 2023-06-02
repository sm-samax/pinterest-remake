import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { EXPIRATION_TIME, MOCK_CREDENTIALS, MOCK_USER, MOCK_USERS } from '../constants';
import { LoginRequest } from '../models/login-request';
import { SignUpRequest } from '../models/sign-up-request';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser?: UserDto;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  getUser() : Observable<UserDto> {
    // return this.http.get('http://localhost:8080/access', {headers: {'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
    return of(MOCK_USERS[parseInt(localStorage.getItem('token') || '')]);
  }

  login(loginRequest: LoginRequest) : Observable<UserDto>{
    // return this.http.post('http://localhost:8080/login', loginRequest)
    // .pipe(tap(res => this.setSession(res)));
    for(let i = 0; i < MOCK_CREDENTIALS.length; i++) {
      let credential = MOCK_CREDENTIALS[i];

      if(loginRequest.email === credential.email &&
        loginRequest.password === credential.password) {
          return of(MOCK_USERS[i])
          .pipe(tap(res => this.setSession(res)));
        }
    }

    throw new Error();
  }

  signup(signUpRequest: SignUpRequest) : Observable<UserDto>{
    // return this.http.post('http://localhost:8080/register', signUpRequest)
    // .pipe(tap(res => this.setSession(res)));

    MOCK_CREDENTIALS.forEach(credential => {
      if(signUpRequest.email === credential.email) {
        throw new Error();
      }
    });

    let newUser : UserDto = {
      id: MOCK_USERS.length,
      username: signUpRequest.username,
      email: signUpRequest.email,
      accessToken: 'token',
    }

    MOCK_USERS.push(newUser);

    MOCK_CREDENTIALS.push({
      email: signUpRequest.email || '',
      password: signUpRequest.password || ''
    });

    console.log(MOCK_CREDENTIALS);
    console.log(MOCK_USERS);

    return of(newUser).pipe(tap(res => this.setSession(res)));
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
      localStorage.setItem('token', userDto.id.toString());
      setTimeout(() => this.logout, EXPIRATION_TIME);
    }
  }
}
