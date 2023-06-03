import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  file: File | null = null;
  preview!: string | Blob;

  ngOnInit() {
    this.size = this.minSize;
    this.preview = this.defaultPreview;
  }

  updatePreview(e : any) {
    if(e) {
      const file = e.target.files[0];
      if(file) {
        this.preview = URL.createObjectURL(file);
        this.size = this.maxSize;
        this.file = file;

        const reader = new FileReader()
        reader.onload = (ev) => {
          if(ev.target) {
            this.onChange(ev.target.result);
          }
        };

        reader.readAsDataURL(file);
      }
    }
    else {
    }
  }

  writeValue(obj: any): void {
    this.preview = this.defaultPreview;
    this.file = null;
    this.size = this.minSize;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
