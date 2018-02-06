import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

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

  updateTaskList() {
    this.getAllTasks();
  }

}
