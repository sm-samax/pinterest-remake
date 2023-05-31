import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageDto } from 'src/app/models/image-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  imageUploadRequest : FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    tags: this.fb.control(''),
  })

  file? : File;
  success: boolean = false;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService) {
  }

  uploadImage() {
    if(this.imageUploadRequest.valid && this.file) {
      this.imageService.postImage(this.imageUploadRequest.value, this.file)
    .subscribe(() => {
      this.handleSucces();
      this.imageUploadRequest.reset();
    },
    this.handleError);
    }
    else {
      this.handleError();
    }
  }

  loadImage(event: any) {
    this.file = event.target.files[0];
  }

  handleSucces() {
    this.success = true;
    this.error = false;
  }

  handleError() {
    this.success = false;
    this.error = true;
  }
}
