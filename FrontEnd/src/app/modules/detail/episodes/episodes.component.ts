import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MovieService} from 'src/app/core/api_services/movie.service';
import {ISeason} from 'src/app/core/domain/season';
import {StorageService} from 'src/app/core/services/sharedservice.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  table = ['1', '1', '1', '1', '1', '1', '1', '1', '1'];
  idShow: any;
  sNumber: any;
  season: ISeason;
  name: any;
  nbSeasons: any;
  counters: any[] = [];
  lang: any;
  dir: string;

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private service: MovieService, private router: Router, private storageService: StorageService) {
  }

  ngOnInit() {
    this.lang = this.storageService.read('language');
    this.dir = this.lang == 'ar' ? 'rtl' : 'ltr';
    this.spinner.show();
    this.route.params.subscribe((params) => {
      this.nbSeasons = params['s'];
      console.log(this.nbSeasons);
      for (let i = 1; i <= this.nbSeasons; i++) {
        this.counters.push(i);
      }
      console.log(this.counters);

    });
    this.route.params.subscribe((params) => {
      this.name = params['name'];
    });
    this.route.params.subscribe((params) => {
      this.idShow = params['id'];
    });
    this.route.params.subscribe((params) => {
      this.sNumber = params['ep'];
    });
    this.getEpisodes();
  }

  getEpisodes() {
    this.service.getSeasonDetail(this.idShow, this.sNumber, this.lang).subscribe(
      res => {
        console.log(res);
        this.season = res;

      },
      err => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  counter(i: number) {
    return new Array(i);
  }

  goToActor(id: number) {
    this.router.navigate(['detail/actorworks', id]);
  }

  getYear(date: string) {
    return date.substr(0, 4);
  }
}
