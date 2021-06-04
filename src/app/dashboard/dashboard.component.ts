import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/query.interface';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  $playlists: Observable<any>;

  constructor(private readonly spotifyService: SpotifyService) {
    this.$playlists = this.spotifyService.getPlaylists();
  }

  ngOnInit(): void {}

  getPlaylists(): void {
    this.$playlists = this.spotifyService.getPlaylists();
    
  }

  getPlaylist(searchItem: Item): void {
    console.log(searchItem);
    this.spotifyService.getPlaylist(searchItem.id).subscribe((playlist) => {
      console.log(playlist);
    }, () => {})
  }
}
