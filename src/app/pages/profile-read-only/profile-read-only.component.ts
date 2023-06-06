import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageDto } from 'src/app/models/image-dto';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-profile-read-only',
  templateUrl: './profile-read-only.component.html',
  styleUrls: ['./profile-read-only.component.css']
})
export class ProfileReadOnlyComponent implements OnInit{
  user!: UserDto;
  images: ImageDto[] = [];
  follows!: boolean;

  constructor(private auth : AuthService,
    private imageService : ImageService,
    private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(urls => {
      let id: number = parseInt(urls[1].path);
      this.auth.getUser(id).subscribe(res => this.user = res);
      this.auth.isFollowed(id).subscribe(res => this.follows = res);
      this.imageService.getImagesForUser(id).subscribe(res => this.images = res);

    })
  }

  toggleFollow() {
    if(this.auth.canActivate()) {
      this.follows = !this.follows;
      this.auth.toggleFollow(this.user.id);
    }
  }
}
