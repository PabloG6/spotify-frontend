import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router, private serializer: UrlSerializer) { }

  ngOnInit(): void {
  }

  authenticate() {
    const scope = 'user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';
    const params = new HttpParams({fromObject: {
      response_type: 'code',
      scope: scope, 
      client_id: environment.client_id, 
      show_dialog: true,
      redirect_uri: environment.redirect_uri
    }});
    const externalUrl = "https://accounts.spotify.com/authorize?" + params.toString();
    window.location.href = externalUrl;

  }

}
