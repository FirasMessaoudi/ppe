import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { IMovie } from "src/app/core/domain/movie";
import { MovieModel } from "src/app/core/domain/moviemodel";
import { MovieService } from "src/app/core/api_services/movie.service";

@Component({
  selector: "app-allproductbycategory",
  templateUrl: "./allproductbycategory.component.html",
  styleUrls: ["./allproductbycategory.component.scss"],
})
export class AllproductbycategoryComponent implements OnInit {
  movies: MovieModel[] = [];
  category: number;
  name: string;
  section: string;
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
      this.category = params["category"];
    });
    this.route.params.subscribe((params) => {
      this.name = params["name"];
    });
    this.route.params.subscribe((params) => {
      this.section = params["section"];
    });

    this.init();
  }
  init() {
    if (this.section == "Movies") {
      this.spinner.show();
      this.movieService.getMoviesByGenre(this.category, this.p).subscribe(
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
    } else {
      this.spinner.show();

      this.movieService.getTvByGenre(this.category, this.p).subscribe(
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
