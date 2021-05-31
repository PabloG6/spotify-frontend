import { HttpClient, HttpHeaders } from '@angular/common/http';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpotifyCredentials } from './models/token';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  private httpHeaders: HttpHeaders = new HttpHeaders();
  setHttpHeaders() {
    if (this.credentials.access_token != null) {
      console.log(this.credentials);
      this.httpHeaders = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.credentials.access_token}`
      ).set('content-type', 'application/json')
      return;
    }

    //todo retrieve a new token using the refresh token
  }

  set credentials(credentials: ISpotifyCredentials) {
    this.cookieService.set('access_token', credentials.access_token, {
      expires: credentials.expires_in,
    });
    this.cookieService.set('expires_in', credentials.expires_in.toString(), {
      expires: credentials.expires_in,
    });
    this.cookieService.set('refresh_token', credentials.refresh_token);
    this.cookieService.set('scope', credentials.scope, {
      expires: credentials.expires_in,
    });
  }

  get credentials() {
    const _credentials: ISpotifyCredentials = {
      access_token: this.cookieService.get('access_token'),
      expires_in: parseInt(this.cookieService.get('expires_in')),
      refresh_token: this.cookieService.get('refresh_token'),
      scope: this.cookieService.get('scope'),
      token_type: 'Bearer',
    };
    return _credentials;
  }

  getToken(params: any): Observable<ISpotifyCredentials> {
    return this.httpClient
      .get<ISpotifyCredentials>('/api/get_token', {
        params: {
          grant_type: 'authorization_code',
          code: params.code,
          redirect_uri: environment.redirect_uri,
        },
      })
      .pipe(
        tap((credentials) => {
          this.credentials = credentials;
        }),
        catchError((err) => {
           
          
          return of(err)
        })
      );
  }

  getPlaylists(): Observable<any> {
    this.setHttpHeaders();
    console.log(this.httpHeaders);
    return this.httpClient.get('/v1/search', {
      headers: this.httpHeaders,
      params: {
        limit: 6,
        
       
      }
    });
  }
}
