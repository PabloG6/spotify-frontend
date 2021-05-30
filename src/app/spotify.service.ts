import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyAuthToken as SpotifyCredentials } from './models/token';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private readonly httpClient: HttpClient) { 

  }

  set credentials(credentials: SpotifyCredentials) {

  }
}

