import { Component, Input } from '@angular/core';
import { ImageDto } from 'src/app/models/image-dto';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent {
  @Input("images")
  images?: ImageDto[]; //= ['./assets/dog.jpg', './assets/cat.jpg', './assets/bieber.jpg', './assets/parret.jpg', './assets/owl.jpg']
}
