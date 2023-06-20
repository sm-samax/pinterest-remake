import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AvatarUploadComponent,
      multi: true
    }
  ]
})
export class AvatarUploadComponent implements ControlValueAccessor{
  
  @Input('defaultPreview')
  defaultPreview!: string;
  
  onChange!: Function;
  file!: File | null;
  preview!: string | Blob;

  ngOnInit() {
    this.preview = this.defaultPreview;
  }

  writeValue(obj: any): void {
    if(obj.target) {
      const file = obj.target.files[0];

      if(file) {
        this.preview = URL.createObjectURL(file);
        this.file = file;

        const reader = new FileReader()
        reader.onload = (e) => {
          if(e.target) {
            this.onChange(e.target.result);
          }
        };

        reader.readAsDataURL(file);
      }
    } else {
      this.preview = this.defaultPreview;
      this.file = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
