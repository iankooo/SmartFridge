import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
// @ts-ignore
import {AuthService, ReglogResponseData} from './reg-log.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reg-log',
  templateUrl: './reg-log.component.html',
  styleUrls: ['./reg-log.component.css'],
})
export class RegLogComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private reglogService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let reglogObs: Observable<ReglogResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      reglogObs = this.reglogService.login(email, password);
    } else {
      reglogObs = this.reglogService.signup(email, password);
    }

    reglogObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/main-page']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
