import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
signUpRequest : FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })

  invalid: boolean = false;

  signUp() {
    if(this.signUpRequest.invalid)
    {
     this.invalid = true;
    }
    else {
      console.log(this.signUpRequest.value);
    }

  }
}
