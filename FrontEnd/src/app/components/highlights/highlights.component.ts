import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { IMovie } from 'src/app/domain/movie';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {
  @ViewChild('carousel') carousel:any;
  highlightmovies: IMovie;
  tvs:IMovie;
  array = [ 1, 2, 3, 4 ];
  p=1;
  slides : Array<any> = []
  options : any = {
    clicking: true,
    sourceProp: 'src',
    visible: 7,
    perspective: 1,
    startSlide: 0,
    border: 3,
    dir: 'ltr',
    width: 360,
    height: 270,
    space: 220,
    autoRotationSpeed: 3000,
    loop: true
}
  constructor(private _service: MovieService,private router: Router) {
    // config.interval = 5000;
    // config.wrap = true;
    // config.keyboard = true;
    // config.pauseOnHover = false;
    // config.showNavigationArrows = true;
   }

  
  ngOnInit(){
    
    this._service.trendingMovie().subscribe(
      res => this.highlightmovies = res,
      err=> console.log(err.error),
      ()=>{
        console.log(this.highlightmovies.results);
        let newSlides = new Array<object>()
 
        this.highlightmovies.results.forEach((item) => {
          newSlides.push({src: 'https://image.tmdb.org/t/p/original'+item['backdrop_path']})
        })
        this.slides = newSlides.concat(this.slides)
      }
     )
    //  this._service.trendingTV().subscribe(
    //    res => this.tvs = res,
    //    err=> console.log(err.error),
    //    ()=>{
    //      console.log(this.tvs.results)
         
    //    }
    //   )
      //
      
  }
  slideClicked (index) {
    this.carousel.slideClicked(index)
   }
  goToDetails($event){
    console.log($event);
    
   this.router.navigateByUrl('/viewDetails'+'Movies'+$event)
  }

}
