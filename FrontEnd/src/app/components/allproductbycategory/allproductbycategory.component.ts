import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/domain/movie';
import { MovieModel } from 'src/app/domain/moviemodel';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-allproductbycategory',
  templateUrl: './allproductbycategory.component.html',
  styleUrls: ['./allproductbycategory.component.scss']
})
export class AllproductbycategoryComponent implements OnInit {
  movies: MovieModel[] = [];
  category: number;
  name:string
  section:string;
  p: number = 1;
s: number = 12;
t: number = 1;
isLoading;
showError= false;
  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
} ;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
    }
    );
    this.route.params.subscribe(params => {
      this.name = params['name'];
    }
    );
    this.route.params.subscribe(params => {
      this.section = params['section'];
    }
    );
    
   this.init()
  }
  init(){
    if(this.section=='Movies'){
      this.movieService.getMoviesByGenre(this.category,this.p).subscribe(
        res =>
        {this.movies.push(...res.results)
        this.t = res.total_pages;
        },
        erreur => {console.log('erreur section and category');
        this.showError = true;
      
      },
        ()=>{
          console.log(this.movies);

        }
      );
  
    } else {
      this.movieService.getTvByGenre(this.category,this.p).subscribe(
        res =>
        {this.movies.push(...res.results)
        this.t = res.total_pages;
        },
        erreur => {
        console.log('erreur section and category');
        this.showError = true;
      
      },        ()=>{
          console.log(this.movies)

        }
      );
    }

  }
  changePage($event){
    this.p = $event;
    console.log(this.p);
    this.init();
  
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
