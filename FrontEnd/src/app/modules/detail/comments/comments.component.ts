import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {CommentService} from 'src/app/core/api_services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input()
  idMovie: any;
  @Input()
  user: any;
  isLoggedIn: boolean;
  comments: any[] = [];
  myComment = '';
  editMode: boolean;
  selectedComment: any = {};

  constructor(
    private commentService: CommentService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user) {
      this.user = changes.user.currentValue;
      this.isLoggedIn = this.user != null && this.user != undefined;
    }
  }

  ngOnInit() {
    this.isLoggedIn = this.user != null && this.user != undefined;
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
    const comment: any = {};
    comment.comment = this.myComment;
    comment.commentDate = new Date();
    comment.userId = this.user.id;
    comment.idMovie = this.idMovie;
    comment.username = this.user.username;
    comment.likes = 0;
    this.commentService.addComment(comment).subscribe(
      (res) => this.comments.push(res),
      (err) => console.log(err),
      () => {
        this.myComment = '';
      }
    );
  }

  delete(id: any) {
    this.commentService.deleteComment(id).subscribe((res) => {
      const removeIndex = this.comments.map((item) => item.id).indexOf(id);
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

  sanitize(comment) {
    // if(comment.user.picture){
    // return this.sanitizer.bypassSecurityTrustResourceUrl(comment.user.picture);
    // } else {
    return 'https://www.w3schools.com/howto/img_avatar.png';
    // }
  }

  likeDislike(comment) {
    if (this.isLoggedIn) {
      let newComment: any = {};
      this.commentService.likeDislike(comment.id, this.user.id).subscribe(
        res => newComment = res,
        err => console.log(err),
        () => {
          const index = this.comments.map((item) => item.id).indexOf(comment.id);
          this.comments[index] = newComment;
        }
      );
    }
  }

  likedOrNot(comment) {
    let index = -1;
    if (comment.likedBy && this.user) {
      index = comment.likedBy.map((item) => item.id).indexOf(this.user.id);
    }
    return index;
  }

  likesNumber(comment) {
    if (comment.likedBy) {
      return comment.likedBy.length;
    }
    return 0;
  }
}
