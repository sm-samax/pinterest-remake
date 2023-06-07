import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFile } from 'src/app/models/custom-file';

@Component({
  selector: 'app-upload-image-form',
  templateUrl: './upload-image-form.component.html',
  styleUrls: ['./upload-image-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadImageFormComponent,
      multi: true
    }
  ]
})
export class UploadImageFormComponent implements ControlValueAccessor, OnInit {

  @Input('minsize')
  minSize!: number;
  @Input('maxsize')
  maxSize!: number;
  
  @Input('defaultPreview')
  defaultPreview!: string;
  
  size!: number;
  onChange!: Function;
  file!: File | null;
  preview!: string | Blob;

  ngOnInit() {
    this.size = this.minSize;
    this.preview = this.defaultPreview;
  }

  writeValue(obj: any): void {
    if(obj) {
      const file = obj.target.files[0];

      if(file) {
        this.preview = URL.createObjectURL(file);
        this.size = this.maxSize;
        this.file = file;

        const reader = new FileReader()
        reader.onload = (e) => {
          if(e.target) {

            let custom : CustomFile = {
              filename: file.name,
              data: e.target.result?.toString() || ''
            }
            this.onChange(custom);
          }
        };

        reader.readAsDataURL(file);
      }
    } else {
      this.preview = this.defaultPreview;
      this.file = null;
      this.size = this.minSize;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
