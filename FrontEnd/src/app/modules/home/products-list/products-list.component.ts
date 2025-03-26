import {Component, OnInit} from '@angular/core';
import {ICategory} from 'src/app/core/domain/icategory';
import {StorageService} from 'src/app/core/services/sharedservice.service';
import {IMovie} from 'src/app/core/domain/movie';
import {MovieService} from 'src/app/core/api_services/movie.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  p = 1;
  movies: IMovie;
  tvs: IMovie;

  categories: ICategory[];
  lang: string;
  showError: boolean;
  theme: any;
  responsiveOptions;

  // tslint:disable-next-line:max-line-length
  constructor(
    private storageService: StorageService,
    private _service: MovieService,
    private spinner: NgxSpinnerService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 6,
        numScroll: 6
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.spinner.show();
    this.lang = this.storageService.read('language');
    this.storageService.themeObs.subscribe(
      res => this.theme = res
    );
    this._service.trendingMovie().subscribe(
      (res) => (this.movies = res),
      (erreur) => {
        console.log('erreur movie');
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
        console.log('erreur movie');
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
