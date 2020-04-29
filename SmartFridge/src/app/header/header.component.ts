import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../reg-log/reg-log.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();

  isAuthenticated = false;
  authenticatedEmail: string;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
      this.authenticatedEmail = user.email;
    });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
