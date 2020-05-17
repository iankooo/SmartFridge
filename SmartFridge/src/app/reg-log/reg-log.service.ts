import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Global} from '../shared/global';

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
  userData: any; // Save logged in user data

  private theUser = new Subject<User>();

  forDeletePurpose: User;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    public global: Global) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
  }

  get user(): Subject<User> {
    return this.theUser;
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
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.theUser.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.forDeletePurpose = user;
    this.global.userEmail = user.email;
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

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      token: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    // console.log(userData);

    if (!userData) {
      return;
    }

    this.handleAuthentication(
      userData.email,
      userData.id,
      userData.token,
      +new Date(userData.tokenExpirationDate)
    );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('selectedFridgeKey');
    this.router.navigate(['/reglog']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        window.alert('Password resetting email has been sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }
}
