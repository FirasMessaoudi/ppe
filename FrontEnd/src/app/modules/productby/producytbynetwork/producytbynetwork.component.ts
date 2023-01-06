import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieService } from 'src/app/core/api_services/movie.service';
import { MovieModel } from 'src/app/core/domain/moviemodel';

@Component({
  selector: 'app-producytbynetwork',
  templateUrl: './producytbynetwork.component.html',
  styleUrls: ['./producytbynetwork.component.scss']
})
export class ProducytbynetworkComponent implements OnInit {

  movies: MovieModel[] = [];
  networkId: number;
  networkLabel: string;
  logo: string;
  p: number = 1;
  showError = false;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movieService: MovieService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.networkId = params["networkId"];
    });
    this.route.params.subscribe((params) => {
      this.networkLabel = params["networkLabel"];
    });
    console.log(localStorage.getItem('logo'));
    
   this.logo = 'https://www.themoviedb.org/t/p/w185/'+localStorage.getItem('logo');

    this.init();
  }
  init() {
      this.spinner.show();
      this.movieService.getTvByNetworkAndPagination(this.networkId, this.p).subscribe(
        (res) => {
          this.movies.push(...res.results);
        },
        (erreur) => {
          console.log("erreur section and category");
          this.showError = true;
          this.spinner.hide();
        },
        () => {
          console.log(this.movies);
          this.spinner.hide();
        }
      );
    
  }
  changePage($event) {
    this.p = $event;
    console.log(this.p);
    this.init();
  }
  @HostListener("window:scroll", ["$event"])
  @HostListener("window:touchmove", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight+1;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos >= max) {
      //Do your action here
      this.p++;
      this.init();
    }
  }

}
