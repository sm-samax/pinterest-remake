import { CustomFile } from "./custom-file";

export class ImageUploadRequest {
    ownerId!: number; 
    name!: string;
    tags?: string;
    avatar?: string;
    file!: CustomFile;
}