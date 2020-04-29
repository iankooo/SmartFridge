import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { ChooseFridgeComponent } from './choose-fridge/choose-fridge.component';
import { MainFunctionalityComponent } from './main-functionality/main-functionality.component';
import { HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// @ts-ignore
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';

import { FridgeListComponent } from './choose-fridge/fridge-list/fridge-list.component';
import { FridgeDetailComponent } from './choose-fridge/fridge-detail/fridge-detail.component';
import {FridgeItemComponent} from './choose-fridge/fridge-list/firdge-item/fridge-item.component';



import { MenuComponent } from './main-functionality/menu/menu.component';
import { MenuItemComponent } from './main-functionality/menu/menu-list/menu-item/menu-item.component';
import { MenuDetailComponent } from './main-functionality/menu/menu-detail/menu-detail.component';
import { MenuListComponent } from './main-functionality/menu/menu-list/menu-list.component';
// @ts-ignore
import {DropdownDirective} from './shared/dropdown.directive';
import { FridgeContainerComponent } from './main-functionality/fridge-container/fridge-container.component';
import { WishListComponent } from './main-functionality/wish-list/wish-list.component';
import { DetailSectionComponent } from './detail-section/detail-section.component';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: 'reglog', component: RegLogComponent },
  { path: 'chooseFridge', component: ChooseFridgeComponent },
  { path: 'main', component: MainFunctionalityComponent }
];


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
    DetailSectionComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
