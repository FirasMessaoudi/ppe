import { MatTabChangeEvent } from '@angular/material/material';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/domain/movie';
import { MovieModel } from 'src/app/domain/moviemodel';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
shows:MovieModel[] = [];
movies:MovieModel[] = [];
keyword = '';
p: number = 1;
index=0;
isLoading = true;
showError: boolean;
  constructor(private route: ActivatedRoute, private service: MovieService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
} ;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.keyword = params['keyword'];
    }
    );
  
  this.init();
  this.initS();
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.p = 1;
    this.index=tabChangeEvent.index;
}
  init(){
    this.service.getMovieByName(this.keyword,this.p).subscribe(
      res => 
      {this.movies.push(...res.results)
      }
        ,
        erreur => {console.log('erreur movie');
        this.showError = true;
      
      },      ()=>{

      }
    )
   
  }
  initS(){
    this.service.getTvShowByName(this.keyword,this.p).subscribe(
      res => 
      {this.shows.push(...res.results)
      }
        ,
        erreur => {console.log('erreur movie');
        this.showError = true;
      
      },      ()=>{

      }
    )
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  //In chrome and some browser scroll is given to body tag
  let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  let max = document.documentElement.scrollHeight;
  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
   if(pos == max )   {
   //Do your action here
   this.p++;
   if(this.index==0){
   this.init();
   }else {
     this.initS();
   }
   }
  }
}
