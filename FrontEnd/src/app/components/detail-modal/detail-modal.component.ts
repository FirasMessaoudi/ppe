import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IFavorit } from 'src/app/domain/ifavorit';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input()
  program: any;
  @Input()
  fav: IFavorit;
  @Output() refreshList = new EventEmitter<any>();

  cat: string ='';
  constructor(private service: UserService) { }

  ngOnInit() {    
   this.program.cat.forEach(element => {
     this.cat=this.cat+element.name+', ';
   });
   
  }
updateFav(){
  this.fav.watched = !this.fav.watched;
  this.service.watchUnWatchMovie(this.fav).subscribe(
    res =>console.log(res),
    err => console.log(err)
  )
}
removeFav(){
  this.service.addToList(this.fav).subscribe(
    res => console.log(res),
    err => console.log(err),
    ()=>{
      let obj = {'id':this.program.id,'section':this.fav.section}
     this.refreshList.emit(obj);
    }
  )
}
}
