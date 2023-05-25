import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private auth: AuthService,
    private http: HttpClient) {
  }

  uploadImage(event: any) {
    const file : File = event.target.files[0];

    if(file) {
      console.log(file.name);

      let form = new FormData();
      form.append('file', file);

      this.http.post('http://localhost:8080/images', form)
      .subscribe(res => console.log(res));
    }
  }
}
