export class UserDto {
    public id!: number;
    public email!: string;
    public username?: string;
    public followers!: number[];
    public follows!: number[];
    public avatar?: string;
    public favorites!: number[];
}
