import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, Observable, throwError } from 'rxjs';
import {
  catchError,
  
  mergeMap,
  retry,
  retryWhen,
  
  take,
  tap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Playlist } from './models/playlist.interface';
import { Profile } from './models/profile.interface';
import { Item, PlaylistSearch } from './models/query.interface';
import { ISpotifyCredentials } from './models/token.interface';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  getPlaylist(id: string): Observable<Playlist> {
    return this.httpClient
      .get<Playlist>(`/api/playlists/${id}`, {})
      .pipe(retryWhen(this._refreshToken.bind(this)));
  }
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {
    this.getProfile().subscribe((profile) => {
      this._profile = profile;
    });
  }

  private httpHeaders: HttpHeaders = new HttpHeaders();
  private _profile!: Profile;
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
    this.cookieService.set('access_token', credentials.access_token);
    this.cookieService.set('expires_in', credentials.expires_in.toString(), {
      expires: credentials.expires_in,
    });
    this.cookieService.set('refresh_token', credentials.refresh_token);
    this.cookieService.set('scope', credentials.scope);
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

  get profile(): Profile {
    return this._profile;
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

  getPlaylists(): Observable<Item[]> {
    console.log('get playlists');
    return this.httpClient.get<Item[]>('/api/playlists/made-for-you', {}).pipe(
      retryWhen(this._refreshToken.bind(this)),
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
          this.cookieService.set('access_token', response.access_token, {
            path: '/',
          });
          console.log('refresh token');
          console.log(this.credentials.access_token);
        })
      );
  }

  _refreshToken(error: Observable<any>): Observable<any> {
    return error.pipe(
      mergeMap((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.refreshToken(this.credentials.refresh_token);
          } else {
            return throwError(err);
          }
        }
        return throwError(err);
      }),
      take(2)
    );
  }

  set profile(profile: Profile) {
    this._profile = profile;
  }
  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>('/api/profile', {}).pipe(
      tap((profile: Profile) => {
        this.profile = profile;
      })
    );
  }

  createPlaylist(body: {
    name: string;
    description: string;
    tracks: string[];
    user_id: string;
  }): Observable<any> {
    console.log(body);
    //todo change this to use route params
    
    body.user_id  = this.profile.id;
    return this.httpClient
      .post<any>('/api/playlists', body)
      .pipe(retryWhen(this._refreshToken.bind(this)));
  }
}
