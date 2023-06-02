import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MOCK_IMAGES, MOCK_USER, MOCK_USERS } from 'src/app/constants';
import { ImageDto } from 'src/app/models/image-dto';
import { UserDto } from 'src/app/models/user-dto';

@Component({
  selector: 'app-profile-read-only',
  templateUrl: './profile-read-only.component.html',
  styleUrls: ['./profile-read-only.component.css']
})
export class ProfileReadOnlyComponent {
  user!: UserDto;
  images: ImageDto[] = [];

  constructor(private activatedRoute : ActivatedRoute) {
    activatedRoute.url.subscribe(segment => {
      let id : number =  parseInt(segment[1].path);

      this.user = MOCK_USERS[id - 1];

      MOCK_IMAGES.forEach(image => {
        if(image.ownerId == id) {
          this.images.push(image);
        }
      })
    })
  }
}
