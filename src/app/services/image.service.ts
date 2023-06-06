import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageDto } from '../models/image-dto';
import { ImageUploadRequest } from '../models/image-upload-request';
import { UserDto } from '../models/user-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
    private auth: AuthService) {
    }

  getImages() : ImageDto[] {
    let raw : string | null = localStorage.getItem('images');
    return raw ? JSON.parse(raw) : [];
  }

  getImagesForUser(id: number) : Observable<ImageDto[]> {
    return of(this.getImages().filter(image => image.ownerId === id));
  }

  getFavoritesForUser(user : UserDto) : Observable<ImageDto[]> {
    return of(this.getImages().filter(image => user.favorites.includes(image.id)));
  }

  getAllImages() : Observable<ImageDto[]> {
    return of(this.getImages());
  }

  postImage(id: number, uploadRequest: ImageUploadRequest) : Observable<void> {
      let images = this.getImages();

      let image :ImageDto = {
      name: uploadRequest.name,
      id: images.length,
      src: uploadRequest.file,
      ownerId: id,
      favorite: false,
      tags: uploadRequest.tags
    }

    images.push(image);

    localStorage.setItem('images', JSON.stringify(images));

    return of();
  }
}
