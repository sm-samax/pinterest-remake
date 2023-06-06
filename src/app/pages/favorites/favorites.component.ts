import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { ImageDto } from 'src/app/models/image-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  favorites!: ImageDto[];

  constructor(private auth : AuthService, private imageService : ImageService) {
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(current => {
      this.imageService.getFavoritesForUser(current).subscribe(res => this.favorites = res);
    })
  }

  download() {
    let zip = new JSZip();

    this.favorites.forEach(image => {
      let data = image.src;
      let extension = '.'.concat(data.substring(data.indexOf('/') + 1, data.indexOf(';')));

      zip.file(image.name.concat(extension), data.split(',')[1], {base64: true});
    })

    zip.generateAsync({type: 'blob'}).then(res => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(res);
      a.download = 'collection.zip';
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }
}
