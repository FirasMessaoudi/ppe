import { Component, OnInit } from "@angular/core";
import { ICategory } from "src/app/domain/icategory";
import { CategoryService } from "src/app/service/category.service";
import { Router } from "@angular/router";
import { StorageService } from "src/app/service/sharedservice.service";
import { IMovie } from "src/app/domain/movie";
import { MovieService } from "src/app/service/movie.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent implements OnInit {
  p = 1;
  movies: IMovie;
  tvs: IMovie;

  categories: ICategory[];
  lang: string;
  showError: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(
    private storageService: StorageService,
    private _service: MovieService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.lang = this.storageService.read("language");
    this._service.trendingMovie().subscribe(
      (res) => (this.movies = res),
      (erreur) => {
        console.log("erreur movie");
        this.showError = true;
        this.spinner.hide();
      },
      () => {
        console.log(this.movies.results);
      }
    );
    this._service.trendingTV().subscribe(
      (res) => (this.tvs = res),
      (erreur) => {
        console.log("erreur movie");
        this.showError = true;
        this.spinner.hide();

      },
      () => {
        console.log(this.tvs.results);
        this.spinner.hide();
      }
    );
  }
}
