import { Component, Input } from '@angular/core';
import { ImageDto } from 'src/app/models/image-dto';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent {
  @Input('image')
  image!: ImageDto;
}
