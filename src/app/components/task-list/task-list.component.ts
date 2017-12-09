import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TaskService } from './../../services/task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  //todo Task model;
  @Input() tasks = [];
  @Output() updateTaskList = new EventEmitter<null>();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  toggleControls(task) {
    this.tasks.map(item => {
      item.selected = item.id === task.id;
    });
  }

  markAsDone(task) {
    //todo common task validation
    if (!task.id) {
      return;
    }
    task.name += ' done!';
    this.taskService.markAsDone(task).subscribe(
      response => {
        if (response.results) {
          this.updateTaskList.emit();
        }
      }
    );
  }

  editTask(task) {
    if (!task.id) {
      return;
    }
    task.name += ' edited';
    this.taskService.editTask(task).subscribe(
      response => {
        if (response.results) {
          this.updateTaskList.emit();
        }
      }
    );
  }

  deleteTask(task) {
    if (!task.id) {
      return;
    }
    this.taskService.deleteTask(task).subscribe(
      response => {
        if (response.results) {
          this.updateTaskList.emit();
        }
      }
    );
  }

}
