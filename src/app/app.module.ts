import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';

// Views
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { OutlineViewComponent } from './views/outline-view/outline-view.component';

// Components
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateItemFormComponent } from './components/create-item-form/create-item-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ItemPickerFormComponent } from './components/item-picker-form/item-picker-form.component';
import { ItemPickerItemComponent } from './components/item-picker-item/item-picker-item.component';
import { ItemMoveButtonComponent } from './components/item-move-button/item-move-button.component';

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
    RegistrationFormComponent,
    ItemPickerFormComponent,
    ItemPickerItemComponent,
    OutlineViewComponent,
    ItemMoveButtonComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ToasterModule.forRoot(),
    ModalModule.forRoot(),
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
