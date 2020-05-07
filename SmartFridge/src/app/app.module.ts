import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { ChooseFridgeComponent } from './choose-fridge/choose-fridge.component';
import { MainFunctionalityComponent } from './main-functionality/main-functionality.component';
import { HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// @ts-ignore
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';


import { MenuComponent } from './main-functionality/menu/menu.component';
import { MenuItemComponent } from './main-functionality/menu/menu-list/menu-item/menu-item.component';
import { MenuDetailComponent } from './main-functionality/menu/menu-detail/menu-detail.component';
import { MenuListComponent } from './main-functionality/menu/menu-list/menu-list.component';
// @ts-ignore
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

@NgModule({
  declarations: [
    AppComponent,
    RegLogComponent,
    ChooseFridgeComponent,
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
    FridgeContainerEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatDatepickerModule
  ],
  providers: [FridgeContainerService, WishListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
