import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

  user!: UserDto;
  error: boolean = false;

  updateProfileRequest : FormGroup = this.fb.group({
    username: this.fb.control(''),
    email: this.fb.control(''),
    avatar: this.fb.control(''),
    password: this.fb.control('', Validators.required)
  })

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(res => {
      this.user = res;
      this.updateProfileRequest.get('avatar')?.setValue(this.user.avatar);
    }, this.auth.logout);
  }

  updateProfile() {
    if(this.updateProfileRequest.valid) {
      try {
        this.auth.updateUser(this.updateProfileRequest.value).subscribe(v => this.router.navigateByUrl('/profile'));
      } catch (error) {
        this.handleError();
      }
    }
    else {
      this.handleError();
    }
  }

  handleError() {
    this.error = true;
  }
}
