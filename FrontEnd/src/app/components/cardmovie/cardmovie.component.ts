import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
  selector: 'app-cardmovie',
  templateUrl: './cardmovie.component.html',
  styleUrls: ['./cardmovie.component.scss']
})
export class CardmovieComponent implements OnInit {
  @Input()
  id: number;
  @Input()
  image: string;
  @Input()
  title: string;
  @Input()
  note: number;
  @Input()
  numbervisits: number;
  @Input()
  dateRelease: Date;
  @Input()
  section: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    //this.image = 'https://image.tmdb.org/t/p/original/'+this.image;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DetailModalComponent, {
      width: '700px',
      data: "test"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
