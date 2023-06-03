import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageDto } from 'src/app/models/image-dto';
import { ImageUploadRequest } from 'src/app/models/image-upload-request';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit{
  imageUploadRequest : FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    tags: this.fb.control(''),
    file: this.fb.control(null, Validators.required)
  })

  user!: UserDto;

  success: boolean = false;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(res => this.user = res);
  }

  uploadImage() {
    if(this.imageUploadRequest.valid) {
      this.imageService.postImage(this.user.id, this.imageUploadRequest.value).subscribe(() => this.handleSucces());
      this.handleSucces()
    }
    else {
      this.handleError();
    }
  }

  handleSucces() {
    this.success = true;
    this.error = false;
    this.imageUploadRequest.reset();
  }

  handleError() {
    this.success = false;
    this.error = true;
  }
}
