import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { Profile } from '../models/profile.interface';
import { ISpotifyCredentials } from '../models/token.interface';
import { SpotifyService } from '../spotify.service';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit, OnDestroy {
  private subsink: SubSink = new SubSink();
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private readonly router: Router,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    const $auth_code: Observable<Profile> = this.activatedRoute.queryParams.pipe(
      mergeMap((params) =>
        this.spotifyService.getToken(params).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              //todo something here...
            }
            this.router.navigate(['error'], { replaceUrl: true });
            return throwError(err);
          })
        )
      ),
      mergeMap(cred => this.spotifyService.getProfile())
    );

    this.subsink.sink = $auth_code.subscribe((profile) => {
      this.router.navigate(['dashboard', profile.id]);
    });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  //todo handle error ui wise.
}
