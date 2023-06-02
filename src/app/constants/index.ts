import { ImageDto } from "../models/image-dto";
import { LoginRequest } from "../models/login-request";
import { UserDto } from "../models/user-dto";

export const EXPIRATION_TIME: number = 15 * 60 * 1000;

export const MOCK_USER: UserDto = {
    id: 1,
    accessToken: 'token',
    username: 'Samuel Meszaros',
    email: 'sample@mail.com',
    avatar: './assets/bieber.jpg',
    notifications: ['Successfully registrated'],
};

export const MOCK_USER2: UserDto = {
    id: 2,
    accessToken: 'token',
    username: 'John Lenon',
    email: 'sample2@mail.com',
    avatar: './assets/owl.jpg',
    notifications: ['Successfully registrated'],
};

export const MOCK_USERS : UserDto[] = [MOCK_USER, MOCK_USER2];

export const MOCK_CREDENTIALS : LoginRequest[] = [
    {
        email: 'sample@mail.com',
        password: 'pw1234'
    },
    {
        email: 'sample2@mail.com',
        password: 'pw4321'
    }
]

export const MOCK_IMAGES: ImageDto[] = [
    {
        id: 1,
        name: 'Cat',
        tags: 'pet cute',
        ownerId: 1,
        ownerAvatar: MOCK_USER.avatar || "",
        src: './assets/cat.jpg',
        favorite: false
    },
    {
        id: 2,
        name: 'Dog',
        tags: 'pet cute',
        ownerId: 1,
        ownerAvatar: MOCK_USER.avatar || "",
        src: './assets/dog.jpg',
        favorite: true
    },
    {
        id: 3,
        name: 'Parrot',
        tags: 'pet wild bird',
        ownerId: 2,
        ownerAvatar: MOCK_USER2.avatar || "",
        src: './assets/parret.jpg',
        favorite: true
    },
    {
        id: 4,
        name: 'Owl',
        tags: 'wild bird',
        ownerId: 2,
        ownerAvatar: MOCK_USER2.avatar || "",
        src: './assets/owl.jpg',
        favorite: false
    },
];