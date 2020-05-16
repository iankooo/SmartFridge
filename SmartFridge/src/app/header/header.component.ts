import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../reg-log/reg-log.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {FridgeDetailComponent} from '../choose-fridge/fridge-detail/fridge-detail.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  isAuthenticated = false;
  authenticatedEmail: string;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fridgeDetail: FridgeDetailComponent,
  ) { }

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.authenticatedEmail = user.email;
    });
  }

  onSelect(feature) {
    this.featureSelected.emit(feature);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onChangePassword() {
    this.authService.forgotPassword(this.authenticatedEmail);
  }

  switchFridge() {
    this.fridgeDetail.fridge = null;
    this.onSelect('chooseFridge');
    this.router.navigate(['/chooseFridge']);
    localStorage.removeItem('selectedFridgeKey');
  }

}
