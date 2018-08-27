import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AppComponent } from './app.component';

// Views
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainViewComponent } from './views/main-view/main-view.component';

// Components
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateItemFormComponent } from './components/create-item-form/create-item-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

// Globally Provided Services
import { UserService } from './services/user.service';
import { ItemService } from './services/item.service';
import { ErrorService } from './services/error.service';

// Other Stuff
import { AppRoutes } from './app.routes';
import { OutgoingInterceptor } from './interceptors/outgoing.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    MainViewComponent,
    LoginFormComponent,
    ItemListComponent,
    ItemDetailsComponent,
    NavbarComponent,
    CreateItemFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ToasterModule.forRoot(),
  ],
  providers: [
    UserService,
    ItemService,
    ErrorService,
    { provide : HTTP_INTERCEPTORS, useClass: OutgoingInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
