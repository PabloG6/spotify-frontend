import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from '../models/playlist.interface';
import { Item, PlaylistSearch } from '../models/query.interface';
import { ShowTracksComponent } from '../show-tracks/show-tracks.component';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  $playlists: Observable<Item[]>;

  constructor(private readonly spotifyService: SpotifyService, private readonly router: Router, private readonly _activatedRoute: ActivatedRoute) {
    this.$playlists = this.spotifyService.getPlaylists();
  }

  ngOnInit(): void {}

  getPlaylists(): void {
    this.$playlists = this.spotifyService.getPlaylists();
    
  }

  getPlaylistImage(playlist: Item): string {
    return playlist.images[0].url
  }

  showTracks(searchItem: Item): void {
  
    this.router.navigate(['tracks', searchItem.id], {relativeTo: this._activatedRoute});

   
   
  }
}