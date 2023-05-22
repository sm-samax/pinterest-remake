import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest : FormGroup = this.fb.group({
    email: this.fb.control('',Validators.required),
    password: this.fb.control('',Validators.required)
  })
  
  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService) {}

  login() {
    if(this.loginRequest.invalid) {
      this.invalid = true;
    }
    else {
      this.loginService.login(this.loginRequest.value);
    }
  }
}
