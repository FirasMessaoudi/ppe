import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/domain/icategory';
import { IUser } from 'src/app/domain/iuser';
import { UserService } from 'src/app/service/user.service';
import { IFavorit } from 'src/app/domain/ifavorit';
import { TokenStorageService } from 'src/app/service/tokenstorage.service';
import { WatchlistComponent } from '../watchlist/watchlist.component';
import { ModalDirective } from 'angular-bootstrap-md';
import { IMovieUserId } from 'src/app/domain/imovieuserid';
import { MovieService } from 'src/app/service/movie.service';
@Component({
  selector: 'app-modalfavorit',
  templateUrl: './modalfavorit.component.html',
  styleUrls: ['./modalfavorit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalfavoritComponent implements OnInit {
  @ViewChild(ModalDirective) basicModal: ModalDirective;
  @Output() updateWatchlist = new EventEmitter<any>();
  @Input()
  id: number;
  @Input()
  title: string;
  @Input()
  image: string;
  @Input()
  description: string;
  @Input()
  dateRelease: Date;
  @Input()
  country: string;
  @Input()
  cat: ICategory[];
  @Input()
  section:string;
  @Input()
  note:number;
  @Input()
  numbervisits:number;
  @Input()
  runtime: string;
  watched :boolean;
  watchList: IFavorit;
  user: IUser;
  closeResult: string;
  existInwatchList: boolean;
  existInFavoris: boolean;
  visible:boolean;
  email:string;
  rate : number;
  item: any = {};
  fav:IFavorit;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private tokenStorage: TokenStorageService, private serviceUser: UserService, private serviceMovie: MovieService) { }

  ngOnInit() {
      this.item = {'id':this.id,'title':this.title,'description':this.description,
      'dateRelease':this.dateRelease,'country':this.country,'cat':this.cat,'note':this.note};
      if(this.section=='Series'){
        this.item.runtime = '50 min';
      } else {
        this.item.runtime = this.runtime+' min';
      }
      this.email=this.tokenStorage.getEmail();    
        this.serviceUser.findOne(new IMovieUserId(this.id,this.email)).subscribe(
          res => this.fav = res,
          err => console.log(err),
          () => {
            console.log(this.fav);
          }
        );

    
  }

refresh($event){
  console.log($event);
  this.updateWatchlist.emit($event);
}
}
