import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMovieUserId } from 'src/app/core/domain/imovieuserid';
import { UserService } from 'src/app/core/api_services/user.service';

@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.scss']
})
export class LikeDislikeComponent implements OnInit, OnChanges {
  @Input()
  user: string;
  @Input()
  id: any;
  @Input()
  section: string;
  movieNote: any;
  constructor(private service: UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.user){
      this.user = changes.user.currentValue;
    }
    if(changes.id){
      this.id = changes.id.currentValue;
    }
    console.log(this.user);
    
    this.service.getLikedDisliked(new IMovieUserId(this.id,this.user)).subscribe(
      res =>this.movieNote = res,
      err =>console.log(err),
      () => {
        console.log(this.movieNote);
        
      }
      
      
    )
  }

  ngOnInit() {
    console.log(this.user);
    
    this.service.getLikedDisliked(new IMovieUserId(this.id,this.user)).subscribe(
      res =>this.movieNote = res,
      err =>console.log(err),
      () => {
        console.log(this.movieNote);
        
      }
      
      
    )
  }
  
  like(){
    if(this.movieNote==null){
    let movieUserId={'idMovie':this.id,'email':this.user};
    this.movieNote= {'movieUserID':movieUserId,'liked':true, 'section':this.section};
    this.service.likeDislike(this.movieNote).subscribe(
      res => console.log(res),
      err =>console.log(err)
    );
    } else {
      this.movieNote.liked = !this.movieNote.liked;
      if(this.movieNote.liked){
        if(this.movieNote.disliked){
          this.movieNote.disliked = false;
        }
      }
      this.service.likeDislike(this.movieNote).subscribe(
        res => console.log(res),
        err =>console.log(err)
      );
    }
  }
  dislike(){
    if(this.movieNote==null){
    let movieUserId={'idMovie':this.id,'email':this.user};
    this.movieNote= {'movieUserID':movieUserId,'disliked':true,'section':this.section};
    this.service.likeDislike(this.movieNote).subscribe(
      res => console.log(res),
      err =>console.log(err)
    );
    } else {
      this.movieNote.disliked = !this.movieNote.disliked;
      if(this.movieNote.disliked){
        if(this.movieNote.liked){
          this.movieNote.liked = false;
        }
      }
      this.service.likeDislike(this.movieNote).subscribe(
        res => console.log(res),
        err =>console.log(err)
      );
    }
  }
  
  likeClass(){
    if(this.movieNote!=null){
    if(this.movieNote.liked){
      return 'icon fa thumb fa-thumbs-up ';
    }
    return 'icon fa thumb fa-thumbs-o-up'
  }
  return 'icon fa thumb fa-thumbs-o-up'
    }

    dislikeClass(){
      if(this.movieNote!=null){
      if(this.movieNote.disliked){
        return 'icon fa thumb fa-thumbs-down';
      }
      return 'icon fa thumb fa-thumbs-o-down';
    }
    return 'icon fa thumb fa-thumbs-o-down';
      }
}
