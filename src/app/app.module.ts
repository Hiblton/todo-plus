import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskAddComponent } from './components/task-add/task-add.component';

import { TaskService } from './services/task.service';
import { ApiService } from './services/api.service';
@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskAddComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    TaskService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
