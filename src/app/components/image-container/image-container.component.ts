import { Component } from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent {
  images: string[] = ['./assets/dog.jpg', './assets/cat.jpg', './assets/bieber.jpg', './assets/parret.jpg', './assets/owl.jpg']
}
