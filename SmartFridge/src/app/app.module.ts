import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { ChooseFridgeComponent } from './choose-fridge/choose-fridge.component';
import { MainFunctionalityComponent } from './main-functionality/main-functionality.component';
import { HeaderComponent} from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    RegLogComponent,
    ChooseFridgeComponent,
    HeaderComponent,
    MainFunctionalityComponent,
    DropdownDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
