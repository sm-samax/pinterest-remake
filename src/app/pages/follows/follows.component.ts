import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit{
  follows! : UserDto[];
  followers! : UserDto[];
  
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(currentuser => {
      this.auth.getMoreUsers(currentuser.follows).subscribe(res => this.follows = res);
      this.auth.getMoreUsers(currentuser.followers).subscribe(res => this.followers = res);
    })
  }
}
