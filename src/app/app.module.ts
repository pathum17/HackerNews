import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './component/story/story.component';
import { CommentComponent } from './component/comment/comment.component';
import { StoryListComponent } from './component/story-list/story-list.component';

import { HttpClientModule } from '@angular/common/http';
import { StoryCardComponent } from './component/story-card/story-card.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    CommentComponent,
    StoryListComponent,
    StoryCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
