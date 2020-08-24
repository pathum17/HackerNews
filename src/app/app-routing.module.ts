import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './component/story-list/story-list.component';
import { StoryComponent } from './component/story/story.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stories/new' },
  { path: 'stories/:type', component: StoryListComponent },
  { path: 'story/:storyId', component: StoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
