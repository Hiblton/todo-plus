import { Component, OnInit } from '@angular/core';

import { TaskService } from './../../services/task.service';
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  task = {
    name: ''
  };

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  onClick() {
    this.taskService.addTask(this.task).subscribe(
      response => {
        if (response.results) {
          this.task.name = '';
        }
      }
    );
  }

}
