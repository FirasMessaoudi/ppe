import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/app/service/category.service";
import { ICategory, Genre } from "src/app/domain/icategory";
import { StorageService } from "src/app/service/sharedservice.service";
import { IMovie } from "src/app/domain/movie";
import { MovieModel } from "src/app/domain/moviemodel";
import { MovieService } from "src/app/service/movie.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-productbysection",
  templateUrl: "./productbysection.component.html",
  styleUrls: ["./productbysection.component.scss"],
})
export class ProductbysectionComponent implements OnInit {
  movies: MovieModel[]=[];
  shows: MovieModel[]= [];
  name: string;
  category: string;
  all = "all";
  categories: Genre;
  sortlist = [
    { id: "vote_average.desc", name: "Vote" },
    { id: "popularity.desc", name: "Popularity" },
    { id: "revenue.desc", name: "Box Office" },
  ]; //box office , popularity ........
  certifications = ["G", "PG", "PG-13", "R", "NC-17", "NR"];
  networks = [
    { id: 49, name: "HBO" },
    { id: 213, name: "Netflix" },
    { id: 1024, name: "Amazon Prime" },
    { id: 71, name: "CW" },
    { id: 71, name: "AMC" },
    { id: 19, name: "Fox" },
    { id: 2243, name: "DC Universe" },
    { id: 30, name: "USA Network" },
    { id: 6, name: "NBC" },
    { id: 453, name: "HULU" },
    { id: 4343, name: "Showtime Networks" },
    { id: 2, name: "ABC" },
    { id: 2360, name: "History" },
    { id: 4, name: "BBC One" },
    { id: 43, name: "National Geographic" },
  ];
  companies = [
    { id: 420, name: "Marvel Studios" },
    { id: 429, name: "DC Comics" },
    { id: 174, name: "Warner Bros. Pictures" },
    { id: 34, name: "Sony Pictures" },
    { id: 2, name: "Walt Disney Pictures" },
    { id: 33, name: "Universal Pictures" },
    { id: 25, name: "20th Century Fox" },
    { id: 4, name: "Paramount" },
    { id: 1632, name: "Lionsgate" },
    { id: 5, name: "Columbia Pictures" },
    { id: 21, name: "MGM Studios" },
  ];
  countries = [
    { id: "en", name: "USA" },
    { id: "de", name: "Germany" },
    { id: "fr", name: "Frensh" },
    { id: "it", name: "Italy" },
    { id: "es", name: "Spain" },
    { id: "jp", name: "Japan" },
    { id: "tr", name: "Turkey" },
    { id: "hi", name: "India" },
  ];
  keyword = "";
  lang: string;
  byActor: any;
  language: string = "en";
  genre: string = "";
  year: string = "";
  rating: string = "";
  network: string = "";
  companie: string = "";
  sortby: string = "popularity.desc";

  today: string;

  p: number = 1;
  s: number = 20;
  t: number = 1;
  showError: boolean;
  SWIPE_ACTION = { LEFT: "swipeleft", RIGHT: "swiperight" };

  // tslint:disable-next-line:max-line-length
  constructor(
    private storageService: StorageService,
    private catService: CategoryService,
    private service: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.today =
      new Date().getFullYear().toString() +
      "-" +
      (new Date().getMonth() + 1).toString() +
      "-" +
      new Date().getDate().toString();
    this.lang = this.storageService.read("language");
    this.route.params.subscribe((params) => {
      this.name = params["nameSection"];
    });
    this.init();
  }
  init() {
    this.discover();
    if (this.name == "Movies") {
        this.catService.getMovieGenres(this.lang).subscribe(
          (res) => (this.categories = res),
          (err) => console.log(err.error),
          () => {
            console.log(this.categories);

          }
        );
    } else {
      this.catService.getTvGenres().subscribe(
        (res) => (this.categories = res),
        (err) => console.log(err.error),
        () => {
        }
      );
    }
  }

  search() {
    if (this.keyword != "") {
      console.log(this.keyword);
      if (this.name == "Movies") {
        this.service.getMovieByName(this.keyword).subscribe(
          (res) => (this.movies = res.results),
          (err) => console.log(err.error),
          () => {
            console.log(this.movies);
          }
        );
      } else {
        this.service.getTvShowByName(this.keyword).subscribe(
          (res) => (this.shows = res.results),
          (err) => console.log(err.error),
          () => {
            console.log(this.shows);
          }
        );
      }
    } else {
      this.discover();
    }
  }
  discover() {
    //this.isLoading = true;
    this.spinner.show();
    if (this.name == "Movies") {
      this.service
        .discoverMovie(
          this.sortby,
          this.genre,
          this.companie,
          this.year,
          this.rating,
          this.language,
          this.p
        )
        .subscribe(
          (res) => {
            if(this.p>1){
            this.movies.push(...res.results);
            }else {
              this.movies = res.results
            }
            this.t = res.total_pages;
            console.log(this.t);
          },
          (err) => console.log(err.error),
          () => {
            console.log(this.movies);
            this.spinner.hide();
            //this.isLoading = false;
          }
        );
    } else {
      this.service
        .discoverTV(
          this.sortby,
          this.genre,
          this.network,
          this.year,
          this.language,
          this.p
        )
        .subscribe(
          (res) => {
            if(this.p>1){
              this.shows.push(...res.results);
              }else {
                this.shows = res.results
              }           
          },
          (err) => console.log(err.error),
          () => {
            console.log(this.shows);
            this.spinner.hide();
          }
        );
    }
  }
  getYears() {
    let years: number[] = [];
    for (let i = new Date().getFullYear(); i >= 1950; i--) years.push(i);
    return years;
  }
  @HostListener("window:scroll", ["$event"])
  @HostListener("window:touchmove", ["$event"])
onWindowScroll() {
//In chrome and some browser scroll is given to body tag
let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
let max = document.documentElement.scrollHeight;
// pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
console.log(pos);
console.log(max);


 if(pos == max )   {
 //Do your action here
 this.p++;
 this.discover();
 }
}
filter(){
  this.p = 1;
  this.discover();
}
}
