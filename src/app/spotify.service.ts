import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpotifyCredentials } from './models/token';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private readonly httpClient: HttpClient, private readonly cookieService: CookieService) { 

  }

  set credentials(credentials: ISpotifyCredentials) {
      this.cookieService.set("access_token", credentials.access_token);
      this.cookieService.set("expires_in", credentials.expires_in.toString());
      this.cookieService.set("refresh_token", credentials.refresh_token);
      this.cookieService.set("scope", credentials.scope);
      
  }

  get credentials() {
    const _credentials: ISpotifyCredentials  = {
      access_token: this.cookieService.get("access_token"),
      expires_in: parseInt(this.cookieService.get("expires_in")),
      refresh_token: this.cookieService.get("refresh_token"),
      scope: this.cookieService.get("scope"),
      token_type: "Bearer"
      
    }
    return _credentials;
  }

  getToken(params: any): Observable<ISpotifyCredentials> {
    return this.httpClient.get<ISpotifyCredentials>('/api/get_token', {
      params: {
        grant_type: 'authorization_code',
        code: params.code,
        redirect_uri: environment.redirect_uri
      },
    }).pipe(catchError((err) => of(err)));

  }


}

