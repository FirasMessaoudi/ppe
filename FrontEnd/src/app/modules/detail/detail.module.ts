import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailRoutingModule} from './detail-routing.module';
import {ActorsKnownForComponent} from './actors-known-for/actors-known-for.component';
import {CommentsComponent} from './comments/comments.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShowDetailsComponent} from './show-details/show-details.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {TimeAgoPipe} from 'time-ago-pipe';
import {LikeDislikeComponent} from './like-dislike/like-dislike.component';
import {EpisodesComponent} from './episodes/episodes.component';
import {ShareButtonDirective} from 'ngx-sharebuttons';

@NgModule({
  declarations: [ActorsKnownForComponent, CommentsComponent,
    ProductDetailsComponent, ShowDetailsComponent, LikeDislikeComponent, EpisodesComponent],
  imports: [
    CommonModule,
    SharedModule,
    DetailRoutingModule,
    ShareButtonDirective
  ],
   // providers: [TimeAgoPipe]
  providers: [ShareButtonDirective]
})
export class DetailModule {
}
