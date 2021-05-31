import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { ISpotifyCredentials } from '../models/token.interface';
import { SpotifyService } from '../spotify.service';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit, OnDestroy {
  private  subsink: SubSink = new SubSink();
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private readonly router: Router,
    private spotifyService: SpotifyService
  ) {}
 

  ngOnInit(): void {
    const $auth_code = this.activatedRoute.queryParams.pipe(
      mergeMap((params) => this.spotifyService.getToken(params)),
    );

    

    this.subsink.sink = $auth_code.subscribe((token) => {
        this.router.navigate(['dashboard'])
    })
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  //todo handle error ui wise.
  




}
