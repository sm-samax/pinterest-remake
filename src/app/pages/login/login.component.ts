import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService) {}

  login() {
    if(this.loginRequest.invalid) {
      this.invalid = true;
    }
    else {
      try {
        this.authService.login(this.loginRequest.value);
      } catch (error) {
        this.invalid = true;
      }
    }
  }
}
