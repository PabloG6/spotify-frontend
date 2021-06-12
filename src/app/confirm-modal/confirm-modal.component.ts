import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mergeMap } from 'rxjs/operators';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { ErrorComponent } from '../error/error.component';
import { SpotifyService } from '../spotify.service';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(private readonly spotifyService: SpotifyService,  
    @Inject(MAT_DIALOG_DATA) private data: any, private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  createPlaylist() {

    console.log("create playlist");
    this.spotifyService.createPlaylist(
      {
        name: this.data.title ,
        description: '',
        user_id: this.spotifyService.profile.id,
        tracks: this.data?.tracks
      }
    ).subscribe((val) => {
      this.matDialog.open(SuccessModalComponent, {
        maxWidth: "300px",
        data: {
          successTitle: "Back To Home Page"
        }

      })
    }, () => {
      this.matDialog.open(ErrorModalComponent, {maxWidth: '300px'})
    }, () => {})
  }
}
