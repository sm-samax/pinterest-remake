import { Component } from '@angular/core';
import { ImageDto } from 'src/app/models/image-dto';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent {
  images!: ImageDto[];
  collection!: ImageDto[];

  constructor(private imageService : ImageService) {
    imageService.getAllImages().subscribe(res => {this.collection = res; this.images = res; });
  }

  search() : Function{
    return (regex : string) => {
      let filteredImages : ImageDto[] = []
      regex = regex.toLowerCase();

      this.collection.forEach(image => {
       if(image.name.toLowerCase().includes(regex) || image.tags?.toLowerCase().includes(regex)) {
          filteredImages.push(image);
        }
      })

      this.images = filteredImages;
    }
  }
}
