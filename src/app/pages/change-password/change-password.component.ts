import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  user!: UserDto;

  changePasswordRequest : FormGroup = this.fb.group({
    oldpassword: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
    confirmpassword: this.fb.control('', Validators.required),
  });

  constructor(private auth : AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(res => this.user = res);
  }

  changePassword() {
    if(this.changePasswordRequest.valid) {
      let oldpassword = this.changePasswordRequest.get('oldpassword')?.value;
      let password = this.changePasswordRequest.get('password')?.value;
      this.auth.changePassword(this.user, oldpassword, password).subscribe(v => this.router.navigateByUrl('/profile'));
    }
    else {
      console.log('Error');
    }
  }
}
