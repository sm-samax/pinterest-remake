export class ImageDto {
    id!: number;
    name!: string;
    tags?: string;
    ownerId!: number;
    ownerAvatar?: string;
    src!: string;
    favorite!: boolean;
}