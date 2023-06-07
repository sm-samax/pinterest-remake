export class ImageDto {
    id!: number;
    name!: string;
    filename!: string;
    tags?: string;
    ownerId!: number;
    data!: string;
    favorite!: boolean;
}