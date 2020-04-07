import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { ChooseFridgeComponent } from './choose-fridge/choose-fridge.component';
import { MainFunctionalityComponent } from './main-functionality/main-functionality.component';
import { HeaderComponent} from './header/header.component';
<<<<<<< Updated upstream
=======
import { DropdownDirective } from './shared/dropdown.directive';
import { MenuComponent } from './main-functionality/menu/menu.component';
import { MenuItemComponent } from './main-functionality/menu/menu-list/menu-item/menu-item.component';
import { MenuDetailComponent } from './main-functionality/menu/menu-detail/menu-detail.component';
import { MenuListComponent } from './main-functionality/menu/menu-list/menu-list.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    RegLogComponent,
    ChooseFridgeComponent,
    HeaderComponent,
    MainFunctionalityComponent,
<<<<<<< Updated upstream
=======
    DropdownDirective,
    MenuComponent,
    MenuItemComponent,
    MenuDetailComponent,
    MenuListComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
