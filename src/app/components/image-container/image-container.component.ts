import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageDto } from 'src/app/models/image-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnInit{
  @Input("images")
  images!: ImageDto[];

  constructor(private router : Router, private auth : AuthService) {
  }

  ngOnInit(): void {
    this.images.forEach(image => {
        this.auth.isFavorites(image.id).subscribe(res => image.favorite = res);
    })
  }

  toggleFavorites(image : ImageDto) : Function {
    return () => {
      if(this.auth.canActivate()) {
        image.favorite = !image.favorite;
        this.auth.toggleFavorites(image.id);
      }
    }
  }

  navigateToUser(image : ImageDto) : Function {
    return () => {
      this.router.navigateByUrl(`/profile/${image.ownerId}`);
    }
  }

  download(image : ImageDto) : Function {
    return () => {
      const a = document.createElement('a')
      a.href = image.src
      a.download = image.name;
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  getAvatar(id: number) : string{
    return this.auth.getAvatar(id);
  }
}
