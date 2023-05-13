import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _isLoggedIn: Boolean = false;

  constructor() { }

  public get isLoggedIn(): Boolean {
    return this._isLoggedIn;
  }
  public set isLoggedIn(value: Boolean) {
    this._isLoggedIn = value;
  }
}
