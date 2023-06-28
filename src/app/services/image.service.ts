import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, Observable, retry } from 'rxjs';
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

  getImagesForUser(id: number) : Observable<ImageDto[]> {
    return this.http.get<ImageDto[]>(`http://localhost:8080/images/${id}`).pipe(distinctUntilChanged(), retry(3));
  }

  getFavoritesForUser(user : UserDto) : Observable<ImageDto[]> {
    return this.http.post<ImageDto[]>('http://localhost:8080/favorites', user.favorites).pipe(distinctUntilChanged(), retry(3));
  }

  getAllImages() : Observable<ImageDto[]> {
    return this.http.get<ImageDto[]>('http://localhost:8080/images').pipe(distinctUntilChanged(), retry(3));
  }

  postImage(id: number, uploadRequest: ImageUploadRequest) : Observable<void> {

      let image :ImageDto = {
        id: 0,
        name: uploadRequest.name,
        filename: uploadRequest.file.filename,
        data: uploadRequest.file.data,
        ownerId: id,
        favorite: false,
        tags: uploadRequest.tags
      }

    return this.http.post<void>('http://localhost:8080/images', image).pipe(retry(3));
  }
}
