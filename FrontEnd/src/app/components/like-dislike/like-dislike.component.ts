import { Component, Input, OnInit } from '@angular/core';
import { IMovieUserId } from 'src/app/domain/imovieuserid';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.scss']
})
export class LikeDislikeComponent implements OnInit {
  @Input()
  user: string;
  @Input()
  id: any;
  movieNote: any;
  constructor(private service: UserService) { }

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
    this.movieNote= {'movieUserID':movieUserId,'liked':true};
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
    this.movieNote= {'movieUserID':movieUserId,'disliked':true};
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
  
  likeColor(){
    if(this.movieNote!=null){
    if(this.movieNote.liked){
      return 'blue';
    }
  }
    }

    dislikeColor(){
      if(this.movieNote!=null){
      if(this.movieNote.disliked){
        return 'blue';
      }
    }
      }
}
