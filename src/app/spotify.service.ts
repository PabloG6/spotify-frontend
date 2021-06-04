import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, iif, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  delay,
  flatMap,
  map,
  mergeMap,
  retryWhen,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Playlist } from './models/query.interface';
import { ISpotifyCredentials } from './models/token.interface';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  getPlaylist(id: string): Observable<any> {
    return this.httpClient.get(`/api/playlists/${id}`, {});
  }
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  private httpHeaders: HttpHeaders = new HttpHeaders();
  setHttpHeaders() {
    if (this.credentials.access_token != null) {
      this.httpHeaders = this.httpHeaders
        .set('Authorization', `Bearer ${this.credentials.access_token}`)
        .set('content-type', 'application/json');
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
          return throwError(err);
        })
      );
  }

  getPlaylists(): Observable<any> {
    console.log('get playlists');
    return this.httpClient
      .get<any>('/api/playlists/made-for-you', {})
      .pipe(
        retryWhen(this._refreshToken.bind(this)),
        delay(400),
        catchError((err: any) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient
      .post('/api/refresh_token', {
        refresh_token: refreshToken,
      })
      .pipe(
        tap((response: any) => {
          this.cookieService.set('access_token', response.access_token);
          console.log("refresh token");
          console.log(this.credentials.access_token);
        })
      );
  }

  
  _refreshToken(error: Observable<any>): Observable<any> {
    return error.pipe(
      mergeMap((err: any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            return this.refreshToken(this.credentials.refresh_token);
          } else {
            return throwError(err);
          }
        }
        return throwError(err);

      }),
      take(2),
    );
  }
}
