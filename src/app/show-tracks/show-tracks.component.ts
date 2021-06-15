import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Item, Playlist, Track } from '../models/playlist.interface';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-show-tracks',
  templateUrl: './show-tracks.component.html',
  styleUrls: ['./show-tracks.component.scss'],
})
export class ShowTracksComponent implements OnInit {
  // $data: Observable<any>;
  data: Playlist | undefined;
  title: string = '';
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly datePipe: DatePipe,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.playlistTitle = 'Hello World';
    console.log(this.activatedRoute.snapshot.params);
    const id = this.activatedRoute.snapshot.params.id;
    this.spotifyService.getPlaylist(id).pipe(
      map((data) => {
        data.tracks.items = data.tracks.items.filter((item, index) => {
          if(item.track == null) {
            console.log(`this is the null item: ${index}`, item);
          }

          
          return item.track != null
        
        });
        console.log("object length", data.tracks.items.length);
        return data;
      })
    ).subscribe((data) => {
      this.data = data;
    });
  }

  playlistTitle: string | undefined;
  ngOnInit(): void {}

  get isSomeSelected() {
    const filteredTracks = this.data?.tracks.items.filter(
      (track) => track.track.selected
    );
    return filteredTracks != undefined
      ? filteredTracks?.length > 0 &&
          this.data?.tracks.items.length != filteredTracks.length
      : false;

  }

  get isAllSelected() { 
       return  this.data?.tracks.items.every(item => item.track.selected) ?? false;

  }
  selectAll(selected: boolean): void {
    if (this.data?.tracks.items == undefined) {
      return;
    }

    this.data.tracks.items.forEach((item) => {
      item.track.selected = selected;
    });
  }

  createPlaylist(): void {
    console.log('hello world');
    const tracks = this.data?.tracks.items.filter((item) => item.track.selected).map((item) => item.track.uri) ?? [];

    if(this.title && tracks.length > 0)
    this.matDialog.open(ConfirmModalComponent, {
      data: { tracks: tracks , title: this.title, playlistName: this.data?.name, user_id: this.activatedRoute.snapshot.params.user_id},
      maxWidth: '300px',
      panelClass: 'custom-modal'
      
    });
  }

  getDuration(milliseconds: number | undefined) {
    if (milliseconds == undefined) return '-';
    return moment(milliseconds).format('mm:ss');
  }

  get currentDate(): Date {
    return new Date();
  }

  getAlbumHeight(item: Track | undefined) {
    return item?.album?.images[2]?.height ?? '64px';
  }

  getAlbumSrc(item: Track | undefined) {
    return item?.album?.images[2]?.url;
  }

  getPlaylistSrc(data: Playlist | undefined): string | undefined {
    return data?.images[0]?.url;
  }
}
