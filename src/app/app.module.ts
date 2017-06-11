import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

// Маршруты
const appRoutes: Routes = [
  { path: '', component: TasksListComponent },
  { path: 'edit', component: TaskEditComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskEditComponent,
    NotFoundComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
