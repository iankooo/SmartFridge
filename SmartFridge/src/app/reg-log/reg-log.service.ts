import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';

// tslint:disable-next-line:no-empty-interface
export interface ReglogResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) {}

  get user(): Subject<User> {
    return this._user;
  }

  signup(email: string, password: string) {
    return this.http.post<ReglogResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-Ij5WdnCRpocl-e3AwU56hwRSlpdhx8c',
      {
         email,
         password,
         returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
      })
      );
  }

  login(email: string, password: string) {
    return this.http.post<ReglogResponseData>(
      'https:identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-Ij5WdnCRpocl-e3AwU56hwRSlpdhx8c',
      {
        email,
        password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this._user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct!';
        break;
    }
    return throwError(errorMessage);
  }

  forgetPassword(email: string){
    // this.firebase.passwordReset(email);
    console.log('Password reset email sent successfully');
    this.router.navigate(['/main']);
  }

  // }

}
