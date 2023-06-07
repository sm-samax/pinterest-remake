import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HoverIconComponent } from './components/hover-icon/hover-icon.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UploadImageFormComponent } from './components/upload-image-form/upload-image-form.component';
import { AboutComponent } from './pages/about/about.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FollowsComponent } from './pages/follows/follows.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfileReadOnlyComponent } from './pages/profile-read-only/profile-read-only.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { FollowFormComponent } from './components/follow-form/follow-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    HomeComponent,
    AboutComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    DiscoverComponent,
    NotificationsComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    ImageFormComponent,
    ImageContainerComponent,
    HoverIconComponent,
    NavigationButtonComponent,
    SearchBarComponent,
    UpdateProfileComponent,
    UploadImageComponent,
    ChangePasswordComponent,
    ProfileReadOnlyComponent,
    UploadImageFormComponent,
    FavoritesComponent,
    FollowsComponent,
    FollowFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
