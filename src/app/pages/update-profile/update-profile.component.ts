import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

  user!: UserDto;

  updateProfileRequest : FormGroup = this.fb.group({
    username: this.fb.control('', Validators.required),
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  })

  constructor(private fb: FormBuilder,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe(res => this.user = res, this.auth.logout);
  }

  updateProfile() {
    console.log(this.updateProfileRequest.value);
  }
}
