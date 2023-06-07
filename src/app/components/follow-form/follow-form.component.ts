import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-follow-form',
  templateUrl: './follow-form.component.html',
  styleUrls: ['./follow-form.component.css']
})
export class FollowFormComponent implements OnInit{
  @Input('user')
  user!: UserDto;
  follows!: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.isFollowed(this.user.id).subscribe(res => this.follows = res);
  }

  onFollow() {
    this.follows = !this.follows;
    this.auth.toggleFollow(this.user.id);
  }

  onAvatar() {
    this.router.navigateByUrl(`/profile/${this.user.id}`);
  }
}
