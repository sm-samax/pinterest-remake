import { Component } from '@angular/core';
import { MOCK_IMAGES } from 'src/app/constants';
import { ImageDto } from 'src/app/models/image-dto';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  images : ImageDto[] = MOCK_IMAGES;

  search() : Function{
    return (regex : string) => {
      this.images = [];
      console.log(regex);
      regex = regex.toLowerCase();

      MOCK_IMAGES.forEach(image => {
       if(image.name.toLowerCase().includes(regex)) {
          this.images.push(image);
        }
      })

      console.log(this.images);
    }
  }
}
