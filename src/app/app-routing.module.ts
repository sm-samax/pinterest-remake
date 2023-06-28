import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FollowsComponent } from './pages/follows/follows.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileReadOnlyComponent } from './pages/profile-read-only/profile-read-only.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'discover', component: DiscoverComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [() => inject(AuthService).canActivate()] },
  {path: 'profile/:id', component: ProfileReadOnlyComponent},
  {path: 'update-profile', component: UpdateProfileComponent, canActivate: [() => inject(AuthService).canActivate()] },
  {path: 'upload-image', component: UploadImageComponent, canActivate: [() => inject(AuthService).canActivate()] },
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [() => inject(AuthService).canActivate()] },
  {path: 'favorites', component: FavoritesComponent, canActivate: [() => inject(AuthService).canActivate()] },
  {path: 'follows', component: FollowsComponent, canActivate: [() => inject(AuthService).canActivate()] },
  {path: '**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
