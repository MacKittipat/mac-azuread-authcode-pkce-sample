import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Running LoginGuard');

    // This should be random text.
    const codeVerifier = 'hello';
    let codeChallenge = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
    codeChallenge = codeChallenge
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    console.log(`codeVerifier=${codeVerifier}`);
    console.log(`codeChallenge=${codeChallenge}`);

    window.location.href = `https://login.microsoftonline.com/${environment.tenantId}/oauth2/v2.0/authorize` +
      `?client_id=${environment.clientId}` +
      `&response_type=code` +
      `&redirect_uri=${environment.redirectUrl}` +
      `&scope=openid ${environment.scope}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}`;
    return true;
  }

}
