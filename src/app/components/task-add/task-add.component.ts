import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  @Output() updateTaskList = new EventEmitter<null>();
  sending: boolean;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  onClick() {
    this.sending = true;
    this.taskService.addTask(this.task).subscribe(
      response => {
        if (response.results) {
          this.task.name = '';
          this.updateTaskList.emit();
        }
        this.sending = false;
      }
    );
  }

}
