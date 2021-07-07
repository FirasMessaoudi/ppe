import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TvDetailsModel } from 'src/app/core/domain/tvshowdetail';
import { ISeason } from 'src/app/core/domain/season';
import { IEpisode } from 'src/app/core/domain/episode';
import { IEpisodeDetail } from 'src/app/core/domain/episodeDetail';
import { MovieService } from 'src/app/core/api_services/movie.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit, OnChanges {
  showDetail: TvDetailsModel;
  seasonNumber = 1;
  season: ISeason;
  currentEp: number;
  episode: IEpisode;
  episodes: IEpisodeDetail[]=[];
  episodeCount=[];
  @Input()
  idtmdb: number;
  link='';
  additionalLink: string;
  overview='';
  constructor(private movieService: MovieService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.idtmdb){
      this.idtmdb = changes.idtmdb.currentValue;
      this.movieService.getTvShowById(this.idtmdb).subscribe(
        res => this.showDetail = res,
         err => console.log('erreur' + this.showDetail),
         () => {
           let season: any;
           console.log(this.showDetail)
           this.seasonNumber = this.showDetail.seasons[0].season_number;
           season = this.showDetail.seasons[0];
           if(this.seasonNumber==0){
            this.seasonNumber = this.showDetail.seasons[1].season_number;
            season = this.showDetail.seasons[1];
           }
           this.currentEp =1;
           console.log(this.currentEp)
           for(let i=1;i<=season.episode_count;i++)
           this.episodeCount.push(i);
           console.log(this.episodeCount)
            // this.link = "https://api.123movie.cc/imdb.php?imdb=tt2911666&server=streamtape";
            this.additionalLink ='https://gomo.to/show/'+this.getName()+"/01-01";
            this.link="https://api.123movie.cc/jadeed.php?ep="+this.idtmdb+"-1x1&server_name=f5_series&t="+this.idtmdb;
  
         }
      );

    }
  }

  ngOnInit() {
  }
  changeSeason(event){
    this.seasonNumber=event;
    console.log(this.seasonNumber);

    this.season=this.showDetail.seasons[this.seasonNumber-1];
    console.log(this.season);
    
    this.currentEp = 1;
    this.episodeCount=[];
    for(let i=1;i<=this.season.episode_count;i++)
         this.episodeCount.push(i);
        this.link="https://api.123movie.cc/jadeed.php?ep="+this.idtmdb+"-"+this.seasonNumber+"x"+this.currentEp+"&server_name=f5_series&t="+this.idtmdb;
        this.additionalLink ='https://gomo.to/show/'+this.getName()+"/"+this.getNumber(this.seasonNumber)+"-"+this.getNumber(this.currentEp);

    }
    changeEpisode(event){
      this.additionalLink ='https://gomo.to/show/'+this.getName()+"/"+this.getNumber(this.seasonNumber)+"-"+this.getNumber(event);
      this.link="https://api.123movie.cc/jadeed.php?ep="+this.idtmdb+"-"+this.seasonNumber+"x"+event+"&server_name=f5_series&t="+this.idtmdb;

    }
   getName(){
     let name = this.showDetail.name.toLowerCase().split(":").join("");
     let name2 = name.toLowerCase().split("'").join("-");
     let finalName= name2.split(" ").join("-");
     return finalName.split("&").join("and");
   }
   getNumber(n: any){
     if(n<10){
       return "0"+n.toString();
     }else {
       return n.toString();
     }
   }
}
