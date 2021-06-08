import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private readonly spotifyService: SpotifyService, private matDialog: MatDialog) {
    this.$playlists = this.spotifyService.getPlaylists();
  }

  ngOnInit(): void {}

  getPlaylists(): void {
    this.$playlists = this.spotifyService.getPlaylists();
    
  }

  getPlaylistImage(playlist: Item): string {
    return playlist.images[0].url
  }

  getPlaylist(searchItem: Item): void {
  
   this.spotifyService.getPlaylist(searchItem.id).pipe(map(playlists => {
      playlists.tracks.items.map(item => {
       item.track.selected == true
        return item;
      });
      return playlists;
   })).subscribe((playlists: Playlist) => {
      console.log(playlists);
      this.matDialog.open(ShowTracksComponent, {data: playlists, maxHeight: '600px', height: '100%', panelClass: 'track-dialog'},)
   });

   
  }
}
