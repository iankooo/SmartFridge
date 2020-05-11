import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { ChooseFridgeComponent } from './choose-fridge/choose-fridge.component';
import { MainFunctionalityComponent } from './main-functionality/main-functionality.component';
import { HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import { FridgeListComponent } from './choose-fridge/fridge-list/fridge-list.component';
import { FridgeDetailComponent } from './choose-fridge/fridge-detail/fridge-detail.component';
import {FridgeItemComponent} from './choose-fridge/fridge-list/firdge-item/fridge-item.component';
import { MenuComponent } from './main-functionality/menu/menu.component';
import { MenuItemComponent } from './main-functionality/menu/menu-list/menu-item/menu-item.component';
import { MenuDetailComponent } from './main-functionality/menu/menu-detail/menu-detail.component';
import { MenuListComponent } from './main-functionality/menu/menu-list/menu-list.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { FridgeContainerComponent } from './main-functionality/fridge-container/fridge-container.component';
import { WishListComponent } from './main-functionality/wish-list/wish-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {FridgeContainerService} from './main-functionality/fridge-container/fridge-container.service';
import { FridgeContainerEditComponent } from './main-functionality/fridge-container/fridge-container-edit/fridge-container-edit.component';
import {WishListService} from './main-functionality/wish-list/wish-list.service';
import { GoogleApiComponent } from './main-functionality/menu/menu-detail/google-api/google-api.component';
import {AgmCoreModule} from '@agm/core';
import { RouterModule, Routes} from '@angular/router';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './shared/app-routing.modules';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {Global} from './shared/global';


@NgModule({
  declarations: [
    AppComponent,
    RegLogComponent,
    ChooseFridgeComponent,
    FridgeListComponent,
    FridgeDetailComponent,
    FridgeItemComponent,
    HeaderComponent,
    MainFunctionalityComponent,
    DropdownDirective,
    MenuComponent,
    MenuItemComponent,
    MenuDetailComponent,
    MenuListComponent,
    FridgeContainerComponent,
    WishListComponent,
    LoadingSpinnerComponent,
    FridgeContainerEditComponent,
    GoogleApiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvlMuez85UtA5nDGYoZznQn_gJkaXDPNM',
      libraries: ['places']
    }),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireModule,
    AppRoutingModule,
    AngularFireAuthModule
  ],
  exports: [RouterModule],
  providers: [Global, FridgeListComponent, FridgeDetailComponent, FridgeContainerService, WishListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
