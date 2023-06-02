import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ImageDto } from 'src/app/models/image-dto';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent {
  @Input("images")
  images?: ImageDto[];

  constructor(private router : Router) {

  }

  toggleFavorites(image : ImageDto) : Function {
    return () => {
      image.favorite = !image.favorite;
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
}
