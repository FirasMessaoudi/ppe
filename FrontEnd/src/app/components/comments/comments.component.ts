import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CommentService } from "src/app/service/comment.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input()
  idMovie: any;
  @Input()
  user: any;
  isLoggedIn: boolean;
  comments: any[] = [];
  myComment = "";
  editMode: boolean;
  selectedComment: any= {};
  constructor(
    private commentService: CommentService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.user) {
      this.user = changes.user.currentValue;
      console.log(this.user);
      this.isLoggedIn = this.user != null && this.user != undefined;
      console.log(this.isLoggedIn);
    }
  }

  ngOnInit() {
    console.log(this.user);

    this.isLoggedIn = this.user != null && this.user != undefined;
    console.log(this.isLoggedIn);

    this.findAll();
  }
  findAll() {
    this.commentService.findAllComments(this.idMovie).subscribe(
      (res) => (this.comments = res),
      (err) => console.log(err),
      () => {
        console.log(this.comments);
      }
    );
  }
  addComment() {
    let comment: any = {};
    comment.comment = this.myComment;
    comment.commentDate = new Date();
    comment.user = this.user;
    comment.idMovie = this.idMovie;
    comment.likes = 0;
    this.commentService.addComment(comment).subscribe(
      (res) => this.comments.push(res),
      (err) => console.log(err),
      () => {
        this.myComment = "";
      }
    );
  }
  delete(id: any) {
    this.commentService.deleteComment(id).subscribe((res) => {
      let removeIndex = this.comments.map((item) => item.id).indexOf(id);
      this.comments.splice(removeIndex, 1);
    });
  }
  update() {
    this.commentService.updateComment(this.selectedComment).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => {
        this.editMode = false;
      }
    );
  }
  sanitize(comment){
    // if(comment.user.picture){
    // return this.sanitizer.bypassSecurityTrustResourceUrl(comment.user.picture);
    // } else {
      return "https://www.w3schools.com/howto/img_avatar.png";
    //}
}
likeDislike(comment) {
  let newComment: any ={};
  this.commentService.likeDislike(comment.id,this.user.id).subscribe(
    res => newComment = res,
    err => console.log(err),
    () => {
      let index = this.comments.map((item) => item.id).indexOf(comment.id);
      this.comments[index]=newComment;
    }
    
    
  )
}
likedOrNot(comment){
  let index = -1;
  if(comment.likedBy){
  index = comment.likedBy.map((item) => item.id).indexOf(this.user.id);
  }
  return index;
}
likesNumber(comment){
  if(comment.likedBy){
    return comment.likedBy.length;
  }
  return 0;
}
}
