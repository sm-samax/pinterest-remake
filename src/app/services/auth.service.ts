import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { EXPIRATION_TIME } from '../constants';
import { LoginRequest } from '../models/login-request';
import { SignUpRequest } from '../models/sign-up-request';
import { UserDto } from '../models/user-dto';
import { UserUpdateRequest } from '../models/user-update-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  getCurrentUser() : Observable<UserDto> {
    return of(this.getCurrentUserDirectly());
  }

  private getUsers() : UserDto[] {
    let raw : string | null = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
  }

  private getCredentials() : LoginRequest[] {
    let raw : string | null = localStorage.getItem('credentials');
    return raw ? JSON.parse(raw) : [];
  }

  private getCurrentUserDirectly() : UserDto {
    let raw : string | null = localStorage.getItem('currentuser');
    if(raw) {
      return JSON.parse(raw);
    }
     
    throw new Error();
  }

  private getUserDirectly(id: number) : UserDto {
    return this.getUsers().filter(user => user.id === id)[0];
  }

  public getUser(id: number) : Observable<UserDto> {
    return of(this.getUserDirectly(id));
  }

  public getMoreUsers(ids: number[]) : Observable<UserDto[]> {
    return of(this.getUsers().filter(user => ids.includes(user.id)));
  }

  public getAvatar(id : number) : string {
    return this.getUsers().filter(user => user.id === id)[0].avatar || '../../assets/default-avatar.png';
  }

  public isFollowed(id: number) : Observable<boolean> {
    if(this.isLoggedIn()) {
      let currentuser = this.getCurrentUserDirectly();
      return of(currentuser.follows.includes(id));
    }

    return of(false);
  }

  public toggleFollow(id : number) {
    let user : UserDto = this.getUserDirectly(id);
    let currentuser = this.getCurrentUserDirectly();

    if(currentuser.id === id) {
      return;
    }

    if(!currentuser.follows.includes(id)) {
      currentuser.follows.push(id);
      user.followers.push(currentuser.id);
    } 
    else {
      user.followers = user.followers.filter(u => u !== currentuser.id);
      currentuser.follows = currentuser.follows.filter(u => u !== id);
    }

    this.saveUser(user);
    this.saveUser(currentuser);
    localStorage.setItem('currentuser', JSON.stringify(currentuser));
  }

  isFavorites(id: number) : Observable<boolean> {
    if(this.isLoggedIn()) {
      let currentuser = this.getCurrentUserDirectly();
      return of(currentuser.favorites.includes(id));
    }

    return of(false);
  }

  toggleFavorites(id: number) {
    let currentuser = this.getCurrentUserDirectly();

    if(!currentuser.favorites.includes(id)) {
      currentuser.favorites.push(id);
    }
    else {
      currentuser.favorites = currentuser.favorites.filter(u => u !== id);
    }

    this.saveUser(currentuser);
    localStorage.setItem('currentuser', JSON.stringify(currentuser));
  }

  private saveUser(user: UserDto) {
    let users = this.getUsers().filter(u => u.id !== user.id);
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  public updateUser(updateRequest: UserUpdateRequest) : Observable<boolean> {
    
    let current = this.getCurrentUserDirectly();
    let credential : LoginRequest = this.getCredentials().filter(c => c.email === current.email)[0];
      
      if(credential.password === updateRequest.password) {
        let users : UserDto[] = this.getUsers().filter(user => user.id !== current.id);

        let credentials = this.getCredentials().filter(c => c.email !== credential.email);

        if(updateRequest.email) {
          current.email =  updateRequest.email;
          credential.email = updateRequest.email;
        }

        if(updateRequest.username)
        current.username = updateRequest.username;

        if(updateRequest.avatar)
        current.avatar = updateRequest.avatar;

        this.saveUser(current);

        credentials.push(credential);
        localStorage.setItem('credentials', JSON.stringify(credentials));

        localStorage.setItem('currentuser', JSON.stringify(current));
      } else {
        throw new Error();
      }

      return of(true);
  }

  changePassword(user: UserDto, oldpassword: string, password: string) : Observable<boolean>{
    let credentials = this.getCredentials();
    let credential = credentials.filter(c => c.email === user.email)[0];
    
    if(credential.password !== oldpassword) {
      throw new Error();
    }

    credential.password = password;
    
    credentials = credentials.filter(c => c.email !== user.email);
    credentials.push(credential);
    localStorage.setItem('credentials', JSON.stringify(credentials));

    return of(true);
  }

  login(loginRequest: LoginRequest) : Observable<UserDto>{
    let credentials : LoginRequest[] = this.getCredentials();
    let users : UserDto[] = this.getUsers();

    for(let i = 0; i < credentials.length; i++) {
      let credential = credentials[i];

      if(loginRequest.email === credential.email &&
        loginRequest.password === credential.password) {
          return of(users.filter(u => u.email == loginRequest.email)[0])
          .pipe(tap(res => this.setSession(res)));
        }
    }

    throw new Error();
  }

  signup(signUpRequest: SignUpRequest) : Observable<UserDto>{
    let credentials : LoginRequest[] = this.getCredentials();
    let users : UserDto[] = this.getUsers();

    credentials.forEach(credential => {
      if(signUpRequest.email === credential.email) {
        throw new Error();
      }
    });

    let user : UserDto = {
      id: users.length,
      username: signUpRequest.username,
      email: signUpRequest.email,
      avatar: '../../assets/default-avatar.png',
      favorites: [],
      followers: [],
      follows: [],
    }

    this.saveUser(user);

    let credential : LoginRequest = {
      email: signUpRequest.email,
      password: signUpRequest.password
    }; 

    credentials.push(credential);
    localStorage.setItem('credentials', JSON.stringify(credentials));

    return of(user).pipe(tap(res => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem('currentuser');
  }

  canActivate() : boolean {
    if(this.isLoggedIn()) {
      return true;
    }
    this.logout();
    this.router.navigateByUrl('/login');
    return false;
  }

  isLoggedIn() : boolean {
    return localStorage.getItem('currentuser') != undefined;
  }

  private setSession(userDto: UserDto) {
      localStorage.setItem('currentuser', JSON.stringify(userDto));
      setTimeout(() => this.logout, EXPIRATION_TIME);
  }
}
