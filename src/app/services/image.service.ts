import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_IMAGES, MOCK_USERS } from '../constants';
import { ImageDto } from '../models/image-dto';
import { ImageUploadRequest } from '../models/image-upload-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  getImages() : Observable<ImageDto[]> {
    // return this.http.get<ImageDto[]>('http://localhost:8080/images', {headers: new HttpHeaders(`Authorization: Bearer ${localStorage.getItem('token')}`)});
    let id = parseInt(localStorage.getItem('token') || "");
    return of(MOCK_IMAGES.filter(image => image.ownerId == id));
  }

  postImage(uploadRequest: ImageUploadRequest, file: File) : Observable<void> {
    // let form = new FormData();
    // form.append('uploadRequest', new Blob([JSON.stringify(uploadRequest)], {type: 'application/json'}))
    // form.append('file', file);
    // console.log(form);
    // return this.http.post<void>('http://localhost:8080/images', form,
    // {headers: {'Content-type' : [], 'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
    let id = parseInt(localStorage.getItem('token') || "");

    let reader = new FileReader();
    let url: string | ArrayBuffer | null | undefined = '';

    reader.onload = (e) => {
      url = e.target?.result;
    }
    reader.readAsDataURL(file);

    let image :ImageDto = {
      name: uploadRequest.name,
      id: MOCK_IMAGES.length,
      src: url,
      ownerAvatar: MOCK_USERS[id - 1].avatar,
      ownerId: id,
      favorite: false,
      tags: uploadRequest.tags
    }

    MOCK_IMAGES.push(image);

    return of();
  }
}
