import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImageDto } from 'src/app/models/image-dto';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  images!: ImageDto[];
  user!: UserDto;

  constructor(private auth: AuthService,
    private imageService: ImageService) {
      
  }
  ngOnInit(): void {
    this.imageService.getImages().subscribe(res => this.images = res, this.handleError);
    this.auth.getUser().subscribe(res => this.user = res, this.handleError);
  }

  handleError() {
    this.auth.logout();
  }
}
