export class UserDto {
    public id!: number;
    public email!: string;
    public username?: string;
    public accessToken?: string;
    public notifications?: string[];
    public followers?: UserDto[];
    public follows?: UserDto[];
    public avatar?: string;
}
