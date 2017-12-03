import { Component } from '@angular/core';

import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks = [];

  constructor(private taskService: TaskService) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      response => {
        if (response) {
          this.tasks = response.results;
        }
      }
    );
  }

  onAdd() {
    this.getAllTasks();
  }
}
