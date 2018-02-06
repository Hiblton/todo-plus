import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DayslineComponent } from './components/daysline/daysline.component';
import { TaskListComponent } from './components/task-list/task-list.component';

import { TaskService } from './services/task.service';
import { ApiService } from './services/api.service';
import { AdDirective } from './directives/ad.directive';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    DayslineComponent,
    LayoutComponent,
    AdDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TaskService,
    ApiService
  ],
  entryComponents: [
    TaskListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
