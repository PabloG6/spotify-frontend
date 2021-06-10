import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Playlist, Track } from '../models/playlist.interface';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-show-tracks',
  templateUrl: './show-tracks.component.html',
  styleUrls: ['./show-tracks.component.scss'],
})
export class ShowTracksComponent implements OnInit {
    // $data: Observable<any>;
    data: Playlist | undefined;
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly datePipe: DatePipe,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.playlistTitle = "Hello World"
    const id = this.activatedRoute.snapshot.params.id;
    // this.$data = this.spotifyService.getPlaylist(id)
    this.spotifyService.getPlaylist(id).subscribe((data) => {
      console.log(data);
      this.data = data;
    })
  }


  playlistTitle: string | undefined;
  ngOnInit(): void {}

  get isSomeSelected() {
    const filteredTracks = this.data?.tracks.items.filter(
      (track) => track.track.selected
    );
    return (
      filteredTracks != undefined ? filteredTracks?.length > 0 &&
      this.data?.tracks.items.length != filteredTracks.length: false
    );
  }

  get isAllSelected() {
    return (
      this.data?.tracks.items.filter((track) => track.track.selected).length ==
      this.data?.tracks.items.length
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
    // const tracks = this.data.tracks.items.filter(item => item.track.selected).map((item) => item.track.uri);

    // this.spotifyService.createPlaylist(
    //   {
    //     name: this.playlistTitle ?? `${this.data.name} | ${this.datePipe.transform(this.currentDate)}`,
    //     description: '',
    //     user_id: this.spotifyService.profile.id,
    //     tracks: tracks
    //   }
    // );
  }

  getDuration(milliseconds: number | undefined) {
    if(milliseconds == undefined) return "-"
    return moment(milliseconds).format("mm:ss")
    
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