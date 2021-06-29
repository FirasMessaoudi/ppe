import { Component, OnInit } from '@angular/core';
import { IFavorit } from 'src/app/domain/ifavorit';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/domain/iuser';
import { TokenStorageService } from 'src/app/service/tokenstorage.service';
import { MovieDetailsModel } from 'src/app/domain/moviedetail';
import { TvDetailsModel } from 'src/app/domain/tvshowdetail';
import { IMovieUserId } from 'src/app/domain/imovieuserid';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  submitted = false;
  watch: boolean;
  message: string;
  watchedMovies: MovieDetailsModel[]=[];
  watchedTv: TvDetailsModel[]=[];
  tvList: TvDetailsModel [] = [];
  movieList: MovieDetailsModel [] = [];
  myWatchList: IFavorit[];
  movieUser: IMovieUserId;
  user: IUser;
  email:string;
  isLoggedIn: boolean;
  watched: string='ALL';
  // tslint:disable-next-line:max-line-length
  constructor(private tokenStorage: TokenStorageService,private service: UserService, private route: ActivatedRoute, private router: Router, private movieService: MovieService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
} ;
  }

  ngOnInit() {
        this.email=this.tokenStorage.getEmail();
           this.getWatchList();    
}
updateWatchlist($event){
  if($event.section=='Series'){
    let index = this.tvList.findIndex(m=>m.id==$event.id);
    this.tvList.splice(index,1);
  } else {
    let index = this.movieList.findIndex(m=>m.id==$event.id);
    this.movieList.splice(index,1);
  }
  }

getWatchList(){
  this.myWatchList = [];
  this.tvList = [];
  this.movieList = [];
  this.service.getWatchListByCriteria(this.email, this.watched).subscribe(
    res => this.myWatchList =res,
    err=>console.log(err.error),
    ()=>{
      this.myWatchList.forEach(element => {
        if(element.section=='Series'){
          this.movieService.getTvShowById(element.movieUserID.idMovie).subscribe(
            res=>
            {
            
              this.tvList.push(res);
           },
            err=>console.log(err.error),
          )
        } else {
         this.movieService.getMovieById(element.movieUserID.idMovie).subscribe(
           res=>
           {
            this.movieList.push(res);
          },            
           err=>console.log(err.error),
           ()=>{
           }
         )
        }
      });
    }
 );
}
  
}
