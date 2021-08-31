import { MatTabChangeEvent } from "@angular/material/material";
import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IMovie } from "src/app/core/domain/movie";
import { MovieModel } from "src/app/core/domain/moviemodel";
import { MovieService } from "src/app/core/api_services/movie.service";
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { NgxSpinnerService } from "ngx-spinner";
import { MovieCast } from "src/app/core/domain/moviecast";
import { PersonService } from "src/app/core/api_services/person.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  shows: MovieModel[] = [];
  movies: MovieModel[] = [];
  persons: any[] = [];
  keyword = "";
  p: number = 1;
  index = 0;
  isLoading = true;
  showError: boolean;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: MovieService,
    private personService: PersonService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.keyword = params["keyword"];
    });

    this.init();
    this.initS();
    this.initPerson();
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.p = 1;
    this.index = tabChangeEvent.index;
  }
  init() {
    this.spinner.show();
    this.service.getMovieByName(this.keyword, this.p).subscribe(
      (res) => {
        this.movies.push(...res.results);
      },
      (erreur) => {
        console.log("erreur movie");
        this.showError = true;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }
  initS() {
    this.spinner.show();
    this.service.getTvShowByName(this.keyword, this.p).subscribe(
      (res) => {
        this.shows.push(...res.results);
      },
      (erreur) => {
        console.log("erreur movie");
        this.showError = true;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }
  initPerson() {
    this.spinner.show();
    this.personService.getPersonByName(this.keyword, this.p).subscribe(
      (res) => {
        this.persons.push(...res['results']);
      },
      (erreur) => {
        console.log("erreur person");
        this.showError = true;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }
  @HostListener("window:scroll", ["$event"])
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
      if (this.index == 0) {
        this.init();
      } else if(this.index==1) {
        this.initS();
      } else {
        this.initPerson();
      }
    }
  }
  goToActor(id:number){
    this.router.navigate(['detail/actorworks',id])

  }
}
