import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/domain/movie';
import { MovieModel } from 'src/app/domain/moviemodel';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-productbyimdb',
  templateUrl: './productbyimdb.component.html',
  styleUrls: ['./productbyimdb.component.scss']
})
export class ProductbyimdbComponent implements OnInit {
  p: number = 1;
  s: number = 12;
  t: number = 1;
  top_rated:MovieModel[] = [];
  isLoading;
  showError: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private service: MovieService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
} ;
  }

  ngOnInit() {
    this.init();
  
  }
  init(){
   this.isLoading = true;
    this.service.getTopRatedMovies(this.p).subscribe(
      res =>
      {this.top_rated.push(...res.results)
      this.t = res.total_pages;
      },
      erreur => {console.log('erreur movie');
      this.showError = true;
    
    },      ()=>{
        console.log(this.top_rated);
        this.isLoading = false;

      }
    );
  }
 changePage(event){
   this.p = event;
   this.init()
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
 this.init();
 }
}
}
