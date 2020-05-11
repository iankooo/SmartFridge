import { RouterModule, Routes} from '@angular/router';
import {RegLogComponent} from '../reg-log/reg-log.component';
import {ChooseFridgeComponent} from '../choose-fridge/choose-fridge.component';
import {MainFunctionalityComponent} from '../main-functionality/main-functionality.component';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  { path: '', redirectTo: 'reglog', pathMatch: 'full' },
  { path: 'reglog', component: RegLogComponent },
  { path: 'chooseFridge', component: ChooseFridgeComponent },
  { path: 'main', component: MainFunctionalityComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }


