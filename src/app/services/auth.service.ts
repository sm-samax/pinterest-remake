import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { EXPIRATION_TIME, MOCK_CREDENTIALS, MOCK_USER, MOCK_USER2, MOCK_USERS } from '../constants';
import { LoginRequest } from '../models/login-request';
import { SignUpRequest } from '../models/sign-up-request';
import { UserDto } from '../models/user-dto';
import { UserUpdateRequest } from '../models/user-update-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  getCurrentUser() : Observable<UserDto> {
    // return this.http.get('http://localhost:8080/access', {headers: {'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
    let raw : string | null = localStorage.getItem('currentuser');
    if(raw) {
      return of(JSON.parse(raw));
    }
     
    throw new Error();
  }

  getUsers() : UserDto[] {
    let raw : string | null = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
  }

  getCredentials() : LoginRequest[] {
    let raw : string | null = localStorage.getItem('credentials');
    return raw ? JSON.parse(raw) : [];
  }

  public getUser(id: number) : Observable<UserDto> {
    return of(this.getUsers().filter(user => user.id === id)[0]);
  }

  updateUser(updateRequest: UserUpdateRequest) : Observable<boolean> {
    
    let current = JSON.parse(localStorage.getItem('currentuser') || '');
    let credential : LoginRequest = this.getCredentials().filter(c => c.email === current.email)[0];
      
      if(credential.password === updateRequest.password) {
        let users : UserDto[] = this.getUsers().filter(user => user.id !== current.id);

        let credentials = this.getCredentials().filter(c => c.email !== credential.email);

        if(updateRequest.email) {
          current.email =  updateRequest.email;
          credential.email = updateRequest.email;
        }

        if(updateRequest.username)
        current.username = updateRequest.username;

        if(updateRequest.avatar)
        current.avatar = updateRequest.avatar;

        users.push(current);
        localStorage.setItem('users', JSON.stringify(users));

        credentials.push(credential);
        localStorage.setItem('credentials', JSON.stringify(credentials));

        localStorage.setItem('currentuser', JSON.stringify(current));
      } else {
        throw new Error();
      }

      return of(true);
  }

  changePassword(user: UserDto, oldpassword: string, password: string) : Observable<boolean>{
    let credentials = this.getCredentials();
    let credential = credentials.filter(c => c.email === user.email)[0];
    
    if(credential.password !== oldpassword) {
      throw new Error();
    }

    credential.password = password;
    
    credentials = credentials.filter(c => c.email !== user.email);
    credentials.push(credential);
    localStorage.setItem('credentials', JSON.stringify(credentials));

    return of(true);
  }

  login(loginRequest: LoginRequest) : Observable<UserDto>{
    // return this.http.post('http://localhost:8080/login', loginRequest)
    // .pipe(tap(res => this.setSession(res)));

    let credentials : LoginRequest[] = this.getCredentials();
    let users : UserDto[] = this.getUsers();

    for(let i = 0; i < credentials.length; i++) {
      let credential = credentials[i];

      if(loginRequest.email === credential.email &&
        loginRequest.password === credential.password) {
          return of(users[i])
          .pipe(tap(res => this.setSession(res)));
        }
    }

    throw new Error();
  }

  signup(signUpRequest: SignUpRequest) : Observable<UserDto>{
    // return this.http.post('http://localhost:8080/register', signUpRequest)
    // .pipe(tap(res => this.setSession(res)));

    let credentials : LoginRequest[] = this.getCredentials();
    let users : UserDto[] = this.getUsers();

    credentials.forEach(credential => {
      if(signUpRequest.email === credential.email) {
        throw new Error();
      }
    });

    let user : UserDto = {
      id: users.length,
      username: signUpRequest.username,
      email: signUpRequest.email,
      accessToken: 'token',
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    let credential : LoginRequest = {
      email: signUpRequest.email,
      password: signUpRequest.password
    }; 

    credentials.push(credential);
    localStorage.setItem('credentials', JSON.stringify(credentials));

    return of(user).pipe(tap(res => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem('currentuser');
    localStorage.removeItem('token');
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
    return localStorage.getItem('currentuser') != undefined;
  }

  private setSession(userDto: UserDto) {
    if(userDto.accessToken) {
      localStorage.setItem('currentuser', JSON.stringify(userDto));
      localStorage.setItem('token', userDto.id.toString());
      setTimeout(() => this.logout, EXPIRATION_TIME);
    }
  }
}
