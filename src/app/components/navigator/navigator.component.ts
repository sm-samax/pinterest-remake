import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  constructor(private auth: AuthService) {
  }

  loggedIn() : boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }
}
