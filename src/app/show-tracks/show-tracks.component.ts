import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Playlist, Track } from '../models/playlist.interface';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-show-tracks',
  templateUrl: './show-tracks.component.html',
  styleUrls: ['./show-tracks.component.scss'],
})
export class ShowTracksComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Playlist,
    private readonly spotifyService: SpotifyService,
    private readonly datePipe: DatePipe
  ) {
    this.playlistTitle = `${this.data.name} | ${this.datePipe.transform(this.currentDate)}`
  }

  playlistTitle: string | undefined;
  ngOnInit(): void {}

  get isSomeSelected() {
    const filteredTracks = this.data.tracks.items.filter(
      (track) => track.track.selected
    );
    return (
      filteredTracks.length > 0 &&
      this.data.tracks.items.length != filteredTracks.length
    );
  }

  get isAllSelected() {
    return (
      this.data.tracks.items.filter((track) => track.track.selected).length ==
      this.data.tracks.items.length
    );
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
    const tracks = this.data.tracks.items.filter(item => item.track.selected).map((item) => item.track.uri);

    this.spotifyService.createPlaylist(
      {
        name: this.playlistTitle ?? `${this.data.name} | ${this.datePipe.transform(this.currentDate)}`,
        description: '',
        user_id: this.spotifyService.profile.id,
        tracks: tracks
      }
    );
  }

  get currentDate(): Date {
    return new Date();
  }

  getAlbumHeight(item: Track | undefined) {

    return item?.album?.images[2]?.height ?? '64px';
  }

  getAlbumSrc(item: Track | undefined) {
    return item?.album?.images[2]?.url
  }
}
