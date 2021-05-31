import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  $playlists: Observable<any>;

  constructor(private readonly spotifyService: SpotifyService) {
    this.$playlists = this.spotifyService.getPlaylists();
    
   }

  ngOnInit(): void {
    
  }

  


  

}
