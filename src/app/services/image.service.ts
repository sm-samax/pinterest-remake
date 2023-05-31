import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<ImageDto[]>('http://localhost:8080/images', {headers: new HttpHeaders(`Authorization: Bearer ${localStorage.getItem('token')}`)});
  }

  postImage(uploadRequest: ImageUploadRequest, file: File) : Observable<void> {
    let form = new FormData();
    form.append('uploadRequest', new Blob([JSON.stringify(uploadRequest)], {type: 'application/json'}))
    form.append('file', file);
    console.log(form);
    return this.http.post<void>('http://localhost:8080/images', form,
    {headers: {'Content-type' : [], 'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
  }
}
