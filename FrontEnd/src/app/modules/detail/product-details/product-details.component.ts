import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {IUser} from 'src/app/core/domain/iuser';
import {UserService} from 'src/app/core/api_services/user.service';
import {IMovieUserId} from 'src/app/core/domain/imovieuserid';
import {IFavorit} from 'src/app/core/domain/ifavorit';
import {IMovie} from 'src/app/core/domain/movie';
import {MovieVideosModel} from 'src/app/core/domain/moviemodelvideo';
import {MovieCastModel} from 'src/app/core/domain/moviecast';
import {TokenStorageService} from 'src/app/core/services/tokenstorage.service';
import {ToastrService} from 'ngx-toastr';
import {MovieModel} from 'src/app/core/domain/moviemodel';
import {TvDetailsModel} from 'src/app/core/domain/tvshowdetail';
import {ISeason} from 'src/app/core/domain/season';
import {IEpisode} from 'src/app/core/domain/episode';
import {StorageService} from 'src/app/core/services/sharedservice.service';
import {TranslateService} from '@ngx-translate/core';
import {MovieDetailsModel} from 'src/app/core/domain/moviedetail';
import {MovieService} from 'src/app/core/api_services/movie.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,  // Disable view encapsulation

})
export class ProductDetailsComponent implements OnInit {
  id: number;
  closeResult: string;
  movies: IMovie;
  similar: IMovie;
  year: number;
  path = 'https://image.tmdb.org/t/p/w185/';
  youtube = 'https://www.youtube.com/embed/';
  trailer: string;
  video: MovieVideosModel;
  actors: MovieCastModel;
  note = 0;
  user: IUser;
  message: string;
  movieUserID: IMovieUserId;
  existsInFav: boolean;
  existsInWatchList: boolean;
  isLoadingResults = true;
  myWatchList: IFavorit[];
  similarProducts: MovieModel[];
  username: string;
  isLoggedIn = false;
  link: string;
  additionalLink1: string;
  additionalLink2: string;
  showDetail: TvDetailsModel;
  movieDetail: MovieDetailsModel;
  seasonNumber = 1;
  season: ISeason;
  nbEpisodes: number[] = [];
  episode: IEpisode;
  lang: string;
  read = true;
  section = '';
  showError: boolean;
  profil: string;
  imdbInfo: any;
  dir: string;

  // tslint:disable-next-line:max-line-length
  constructor(
    private storageService: StorageService,
    private translateService: TranslateService,
    private toaster: ToastrService,
    private tokenStorage: TokenStorageService,
    private userservice: UserService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }

  ngOnInit() {
    this.read = true;
    this.lang = this.storageService.read('language');
    this.dir = this.lang == 'ar' ? 'rtl' : 'ltr';
    this.route.params.subscribe((params) => {
      this.id = params['idProduct'];
      this.section = params['section'];
    });

    if (this.section === 'Series') {
      this.spinner.show();
      this.movieService.getTvShowById(this.id, this.lang).subscribe(
        (res) => (this.showDetail = res),
        (erreur) => {
          this.showError = true;
          this.spinner.hide();
        },
        () => {
          console.log(this.showDetail);
          this.spinner.hide();
          this.movieService.getSimilarTv(this.showDetail.id).subscribe(
            (res) => (this.similar = res),
            (err) => console.log(err),
            () => {
              this.similarProducts = this.similar.results;
            }
          );
          this.movieService.getTvCast(this.showDetail.id).subscribe(
            (res) => (this.actors = res),
            (err) => console.log(err),
            () => {
              this.movieService.getTvVideo(this.showDetail.id).subscribe(
                (res) => (this.video = res),
                (err) => console.log(err),
                () => {
                  this.youtube += this.video.results[0].key;
                }
              );
            }
          );
        }
      );
    } else {
      this.spinner.show();
      this.movieService.getMovieById(this.id, this.lang).subscribe(
        (res) => (this.movieDetail = res),
        (erreur) => {
          console.log(erreur);
          this.showError = true;
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
          this.link = 'https://gomo.to/movie/' + this.getName(this.movieDetail.original_title);
          // "https://movie2konline.net/api/openload.php?id=" + this.movieDetail.imdb_id;
          this.movieService.getSimilarMovies(this.movieDetail.id).subscribe(
            (res) => (this.similar = res),
            (err) => console.log(err),
            () => {
              this.similarProducts = this.similar.results;
            }
          );
          this.movieService.getMovieCast(this.movieDetail.id).subscribe(
            (res) => (this.actors = res),
            (err) => console.log(err),
            () => {
              this.movieService.getMovieVideo(this.movieDetail.id).subscribe(
                (res) => (this.video = res),
                (err) => console.log(err),
                () => {
                  console.log(this.video.results);
                  if (this.video.results) {
                    this.youtube += this.video.results[0].key;
                  }
                  this.movieService.getImdbInfo(this.movieDetail.imdb_id).subscribe(
                    res => {
                      this.imdbInfo = res;
                      console.log(this.imdbInfo);

                    },
                    err => console.log(err)
                  );
                }
              );
            }
          );
        }
      );
    }

    this.tokenStorage.currentStatus.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.username = this.tokenStorage.getUsername();
        this.userservice.getUser(this.username).subscribe(
          (res) => (this.user = res),
          (err) => console.log(err),
          () => {
            this.userservice
              .existsInWatchList(new IMovieUserId(this.id, this.user.email))
              .subscribe(
                (res) => (this.existsInWatchList = res),
                (err) => console.log(err.error)
              );
          }
        );
      }
    });

  }

  back() {
    this.location.back();
  }

  addOrDeleteWatchList() {
    const fav = new IFavorit(new IMovieUserId(this.id, this.user.email));
    fav.watched = false;
    fav.section = this.section;
    if (this.section == 'Series') {
      fav.runtime = this.showDetail.episode_run_time[0];
      fav.nbEpisodes = this.showDetail.number_of_episodes;
    } else {
      fav.runtime = this.movieDetail.runtime;
    }
    this.userservice.addToList(fav).subscribe(() => (this.message = 'hhhhh'));
    this.existsInWatchList = !this.existsInWatchList;
  }

  trailerLink(key) {
    return 'https://www.youtube.com/embed/' + key;
  }

  getName(movie: any) {
    const name = movie.toLowerCase().split(':').join('');
    const finalFinalName = name.split('-').join(' ');
    const nameWithouSpeacials = finalFinalName.split('\'').join('-');
    const finalName = nameWithouSpeacials.split(' ').join('-');
    return finalName;
  }

  goToMovieCategory(genre: any) {
    this.router.navigate(['/query/category', 'Movies', genre.name, genre.id]);
  }

  goToSerieCategory(genre: any) {
    this.router.navigate(['/query/category', 'Series', genre.name, genre.id]);
  }

  goToEpisode(season: number) {
    this.router.navigate(['/detail/episode', this.showDetail.name, this.showDetail.id, season, this.showDetail.number_of_seasons]);
  }

  goToDetail(id, name, logo) {
    localStorage.setItem('logo', logo);
    this.router.navigate(['query/network', id, name]);
  }
}
