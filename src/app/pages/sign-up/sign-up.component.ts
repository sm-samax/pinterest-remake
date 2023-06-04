import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private auth: AuthService,
    private router: Router) {
  }

  signUp() {
    if(this.signUpRequest.invalid)
    {
      this.handleError();
    }
    else {
      this.auth.signup(this.signUpRequest.value).subscribe(
        res => this.router.navigate(['/profile']),
        err => this.handleError
      );
    }
  }

  private handleError() {
    this.invalid = true;
  }
}
