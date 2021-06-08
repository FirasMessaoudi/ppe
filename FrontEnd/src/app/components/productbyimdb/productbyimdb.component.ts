import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieModel } from 'src/app/domain/moviemodel';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-productbyimdb',
  templateUrl: './productbyimdb.component.html',
  styleUrls: ['./productbyimdb.component.scss']
})
export class ProductbyimdbComponent implements OnInit {
  p: number = 1;
  top_rated:MovieModel[] = [];
  showError: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private service: MovieService, private spinner: NgxSpinnerService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
} ;
  }

  ngOnInit() {
    this.init();
  
  }
  init(){
   this.spinner.show();
    this.service.getTopRatedMovies(this.p).subscribe(
      res =>
      {this.top_rated.push(...res.results)
      },
      erreur => {console.log('erreur movie');
      this.showError = true;
      this.spinner.hide();
    
    },      ()=>{
        console.log(this.top_rated);
        this.spinner.hide();


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
