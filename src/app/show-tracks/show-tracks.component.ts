import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Playlist } from '../models/playlist.interface';

@Component({
  selector: 'app-show-tracks',
  templateUrl: './show-tracks.component.html',
  styleUrls: ['./show-tracks.component.scss'],
})
export class ShowTracksComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Playlist) {}

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
    return this.data.tracks.items.filter((track) => track.track.selected).length == this.data.tracks.items.length;
  }
  selectAll(selected: boolean): void {
    if (this.data?.tracks.items == undefined) {
      return;
    }

    this.data.tracks.items.forEach((item) => {
      item.track.selected = selected;
    });
  }
}
