import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { IUser } from "src/app/domain/iuser";
import { UserService } from "src/app/service/user.service";
import { IMovieUserId } from "src/app/domain/imovieuserid";
import { IFavorit } from "src/app/domain/ifavorit";
import { IMovie } from "src/app/domain/movie";
import { MovieVideosModel } from "src/app/domain/moviemodelvideo";
import { MovieCastModel } from "src/app/domain/moviecast";
import { TokenStorageService } from "src/app/service/tokenstorage.service";
import { ToastrService } from "ngx-toastr";
import { MovieModel } from "src/app/domain/moviemodel";
import { TvDetailsModel } from "src/app/domain/tvshowdetail";
import { ISeason } from "src/app/domain/season";
import { IEpisode } from "src/app/domain/episode";
import { StorageService } from "src/app/service/sharedservice.service";
import { TranslateService } from "@ngx-translate/core";
import { MovieDetailsModel } from "src/app/domain/moviedetail";
import { MovieService } from "src/app/service/movie.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  closeResult: string;
  movies: IMovie;
  similar: IMovie;
  year: number;
  path = "https://image.tmdb.org/t/p/w185/";
  youtube = "https://www.youtube.com/embed/";
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
  showDetail: TvDetailsModel;
  movieDetail: MovieDetailsModel;
  seasonNumber = 1;
  season: ISeason;
  nbEpisodes: number[] = [];
  episode: IEpisode;
  lang: string;
  read = true;
  section = "";
  showError: boolean;
  profil: string;

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
    this.lang = this.storageService.read("language");
    this.tokenStorage.currentStatus.subscribe((status) => {
      this.isLoggedIn = status;
      this.profil = this.tokenStorage.getUsername();
      this.userservice.getUser(this.profil).subscribe(
        (res) => (this.user = res),
        (err) => console.log(err),
        () => {}
      );
    });
    this.route.params.subscribe((params) => {
      this.id = params["idProduct"];
      this.section = params["section"];
    });

    if (this.section === "Series") {
      this.spinner.show();
      this.movieService.getTvShowById(this.id, this.lang).subscribe(
        (res) => (this.showDetail = res),
        (erreur) => {
          this.showError = true;
          this.spinner.hide();
        },
        () => {
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
          this.link =
            "https://videospider.in/getvideo?key=l6IeT0ahNeECt2IH&video_id=" +
            this.movieDetail.id +
            "&tmdb=1";
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
                  
                  this.youtube += this.video.results[0].key;
                }
              );
            }
          );
        }
      );
    }

    if (this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUsername();

      this.userservice.getUser(this.username).subscribe(
        (res) => (this.user = res),
        (err) => console.log("err"),
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
  }
  back() {
    this.location.back();
  }
  addOrDeleteWatchList() {
    let fav = new IFavorit(new IMovieUserId(this.id, this.user.email));
    fav.watched = false;
    fav.section = this.section;
    this.userservice.addToList(fav).subscribe(() => (this.message = "hhhhh"));
    this.existsInWatchList = !this.existsInWatchList;
    if (this.existsInWatchList)
      this.toaster.success("Program added to watchlist");
    else this.toaster.success("Program removed from watchlist");
  }

  changeSeason(event) {
    this.seasonNumber = event;
    this.season = this.showDetail.seasons[this.seasonNumber];
    for (let i = 0; i < this.season.episode_count; i++)
      this.nbEpisodes[i] = i + 1;
  }
  trailerLink(key){
    return "https://www.youtube.com/embed/"+key;
  }
}
