import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
signUpRequest : FormGroup = this.fb.group({
    email: this.fb.control('', Validators.required),
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
    confirmPassword: this.fb.control('', Validators.required),
  })

  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService) {
  }

  signUp() {
    if(this.signUpRequest.invalid)
    {
     this.invalid = true;
     this.signUpRequest.reset();
    }
    else {
      try {
        this.auth.signup(this.signUpRequest.value);
      } catch (error) {
        this.invalid = true;
        this.signUpRequest.reset();
      }
    }

  }
}
