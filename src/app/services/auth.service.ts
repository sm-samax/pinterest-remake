import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { SignUpRequest } from '../models/sign-up-request';
import { UserDto } from '../models/user-dto';

const EXPIRATION_TIME: number = 15 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  public currentUser?: UserDto;
  public isLoggedIn!: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8080/access')
    .subscribe(res => {
      console.log('Init');
      this.setSession(res);
      this.router.navigate(['/profile']);
    });    
  }

  login(loginRequest: LoginRequest) {
    this.http.post('http://localhost:8080/login', loginRequest)
    .pipe(
      catchError(err => {throw err})
    )
    .subscribe(res => {
      this.setSession(res);
      this.router.navigate(['/profile']);
    });
  }

  signup(signUpRequest: SignUpRequest) {
    this.http.post('http://localhost:8080/register', signUpRequest)
    .pipe(
      catchError(err => {throw err})
    )
    .subscribe(res => {
      this.setSession(res);
      this.router.navigate(['/profile']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.currentUser = undefined;
  }

  canActivate() : boolean {
    if(this.currentUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  private setSession(userDto: UserDto) {
    if(userDto.accessToken) {
      this.currentUser = userDto;
      this.isLoggedIn = true;
      localStorage.setItem('token', userDto.accessToken);
      setTimeout(() => this.logout, EXPIRATION_TIME);
    }
  }
}
