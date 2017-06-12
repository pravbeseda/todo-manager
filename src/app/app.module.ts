import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';
import { SortablejsModule } from 'angular-sortablejs';
import * as moment from 'moment';

import { AppComponent } from './app.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

// Маршруты
const appRoutes: Routes = [
  { path: '', component: TasksListComponent },
  { path: 'edit', component: TaskEditComponent },
  { path: 'edit/:id', component: TaskEditComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskEditComponent,
    NotFoundComponent,
    TasksListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
      prefix: 'task-manager',
      storageType: 'localStorage'
    }),
    SortablejsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
