import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
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
    this.favorites.forEach(image => zip.file(image.filename, image.data.split(',')[1], {base64: true}));
    zip.generateAsync({type: 'blob'}).then(res => FileSaver.saveAs(res, 'collection.zip'));
  }
}
