import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent {
  @Input('src')
  src!: string;
  @Input('label')
  label!: string;
}
