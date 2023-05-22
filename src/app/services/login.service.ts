import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(loginRequest: LoginRequest) {
    console.log('Attempt to login with: ', loginRequest);
  }
}
