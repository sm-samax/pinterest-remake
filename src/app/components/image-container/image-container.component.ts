import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ImageDto } from 'src/app/models/image-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnChanges{
  @Input("images")
  images!: ImageDto[];

  constructor(private router : Router, private auth : AuthService) {
  }

  ngOnChanges() {
    if(this.images) {
      this.images.forEach(image => {
        this.auth.isFavorites(image.id).subscribe(res => image.favorite = res);
      })
    }
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
    return () => FileSaver.saveAs(image.data, image.filename);
  }

  getAvatar(id: number) : string{
    return this.auth.getAvatar(id);
  }
}
