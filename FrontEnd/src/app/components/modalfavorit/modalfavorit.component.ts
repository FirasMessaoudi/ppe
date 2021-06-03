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
  @Output() updateFav =   new EventEmitter<any>();
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
  username:string;
  rate : number;
  item: any = {};
  fav:IFavorit;
  hideModal() {
    this.basicModal.hide();
  }
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private tokenStorage: TokenStorageService, private serviceUser: UserService, private serviceMovie: MovieService) { }

  ngOnInit() {
    // this.image = 'https://image.tmdb.org/t/p/original/' + this.image;
    if(this.tokenStorage.getToken()){
      this.item = {'id':this.id,'title':this.title,'description':this.description,
      'dateRelease':this.dateRelease,'country':this.country,'cat':this.cat,'note':this.note};
      if(this.section=='Series'){
        this.item.runtime = '50 min';
      } else {
        this.item.runtime = this.runtime+' min';
      }
      this.username=this.tokenStorage.getUsername();    
    this.serviceUser.getUser(this.username).subscribe(
      res => this.user = res,
      err =>console.log(err),
      
      () => {
        this.serviceUser.findOne(new IMovieUserId(this.id,this.user.email)).subscribe(
          res => this.fav = res,
          err => console.log(err),
          () => {
            console.log(this.fav);
          }
        );
       }
    );
      }
  }
  openVerticallyCentered(content) {
   //this.modalService.open(content, { centered: true });
  }
  checkIfExistInWatchList() {

    this.serviceUser.existsInWatchList(new IMovieUserId(this.id,this.user.email)).subscribe(
      res => this.existInwatchList = res,
      err => console.log(this.existInwatchList),
      ()=>{
        console.log(this.existInwatchList)
          this.serviceUser.existsInFavoris(new IMovieUserId(this.id,this.user.email)).subscribe(
          res =>this.existInFavoris =res,
          err =>console.log("famma mochkla"),
         () => {
           console.log(this.existInFavoris)
           this.serviceUser.isWatched(new IMovieUserId(this.id,this.user.email)).subscribe(
             res => this.watched = res,
             err=>console.log(err.error)
           )
           console.log("hello boy " +this.watched);
           this.serviceUser.getMovieNote(new IMovieUserId(this.id,this.user.email)).subscribe(
            res => this.rate = res,
            err =>console.log(err.error),
            ()=>{
              console.log(this.rate);
            }
          )
         }
        );
      //  }
      }
    );
    this.visible =true;
        
  }
  addOrDeleteToMyWatchList(){
    let fav = new IFavorit(new IMovieUserId(this.id,this.user.email));
    fav.section = this.section;
    this.serviceUser.addToList(fav)
    .subscribe(
      () => console.log('hhhhh'));
    //  alert('added to watch list');
      this.existInwatchList=!this.existInwatchList;
      this.updateWatchlist.emit(this.id);
      this.hideModal();
  }
  addOrDeleteFavorite() {
    let fav = new IFavorit(new IMovieUserId(this.id,this.user.email));
  
    this.serviceUser.addToMyFav(fav).subscribe(
      () => console.log('user = ', this.user.email, 'id = ' , this.id),
      );
      this.existInFavoris = !this.existInFavoris;
      this.hideModal();
      this.updateFav.emit(this.id);
      //this.watchListComponent.getFavoris();
  }
  watchMovie(): void {
     let productuser = new IMovieUserId(this.id, this.user.email);
    this.serviceUser.watchUnWatchMovie(new IFavorit(productuser))
        .subscribe(() => console.log('good'));
        this.watched = !this.watched;
  }
  rateMovie(event) {
    // this.productUserID = new IMovieUserId(this.id, this.user.email);
    let fav = new IFavorit(new IMovieUserId(this.id,this.user.email));
    fav.section = this.section;
    fav.note = event;
    if(this.tokenStorage.getToken()){
    console.log(this.rate);
    this.rate=event;
    this.serviceUser.rateMovie(fav).subscribe(
      res=>console.log(res),
      err => console.log('msg')
    );
    console.log(this.rate);
    }

    }
refresh($event){
  console.log($event);
  this.updateWatchlist.emit($event);
}
}
