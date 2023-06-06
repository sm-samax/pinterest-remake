export class ImageDto {
    id!: number;
    name!: string;
    tags?: string;
    ownerId!: number;
    src!: string;
    favorite!: boolean;
}