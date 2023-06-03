import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AppRoutingModule } from './app-routing.module';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';
import { HoverIconComponent } from './components/hover-icon/hover-icon.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { httpInterceptorProvider } from './interceptors';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProfileReadOnlyComponent } from './pages/profile-read-only/profile-read-only.component';
import { UploadImageFormComponent } from './components/upload-image-form/upload-image-form.component';

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
    UploadImageFormComponent
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
