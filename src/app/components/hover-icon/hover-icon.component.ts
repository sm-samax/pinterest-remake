import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hover-icon',
  templateUrl: './hover-icon.component.html',
  styleUrls: ['./hover-icon.component.css']
})
export class HoverIconComponent {
  @Input('icon')
  icon!: string;
  @Input('src')
  src!: string;

  @Input('circle')
  circle: boolean = false;
}
