import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_IMAGES, MOCK_USERS } from '../constants';
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

  getAllImages() : Observable<ImageDto[]> {
    return of(this.getImages());
  }

  postImage(id: number, uploadRequest: ImageUploadRequest) : Observable<void> {
    // let form = new FormData();
    // form.append('uploadRequest', new Blob([JSON.stringify(uploadRequest)], {type: 'application/json'}))
    // form.append('file', file);
    // console.log(form);
    // return this.http.post<void>('http://localhost:8080/images', form,
    // {headers: {'Content-type' : [], 'Authorization' : `Bearer ${localStorage.getItem('token')}`}});

    // let url: string | ArrayBuffer | null | undefined = '';

      let images = this.getImages();

      let image :ImageDto = {
      name: uploadRequest.name,
      id: images.length,
      src: uploadRequest.file,
      ownerAvatar: uploadRequest.avatar || '../../assets/default-avatar.png',
      ownerId: id,
      favorite: false,
      tags: uploadRequest.tags
    }

    images.push(image);

    localStorage.setItem('images', JSON.stringify(images));

    return of();
  }
}
