import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  //todo Task model;
  @Input() tasks: Array<Task> = [];
  @Output() updateTaskList = new EventEmitter<null>();
  @ViewChildren('editable_field') editableFields: QueryList<ElementRef>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  toggleControls(task) {
    this.tasks.map(item => {
      item.selected = item.id === task.id;
      item.showControls = item.id === task.id;
    });
  }

  markAsDone(event, task) {
    //todo common task validation
    if (!task.id) {
      return;
    }
    this.taskService.markAsDone(task).subscribe(
      response => {
        if (response.results) {
          this.updateTaskList.emit();
        }
      }
    );
  }

  addTask() {
    this.tasks.push(new Task());
    setTimeout(() => {
      this.editableFields.last.nativeElement.textContent = ' ';
      this.editableFields.last.nativeElement.contentEditable = true;
      this.editableFields.last.nativeElement.focus();
      this.editableFields.last.nativeElement.onblur = () => {
        let title = this.editableFields.last.nativeElement.textContent.trim();
        if (!title) {
          this.tasks.pop();
          return;
        }
        let query = {
          name: title
        };
        this.taskService.addTask(query).subscribe(
          response => {
            if (response.results) {
              this.updateTaskList.emit();
            }
          }
        );
      };
    }, 0);
  }

  editTask(event, task, index) {
    event.stopPropagation();
    if (!task.id) {
      return;
    }
    task.showControls = false;
    let field = this.editableFields.toArray();
    field[index].nativeElement.contentEditable = true;
    field[index].nativeElement.focus();
    field[index].nativeElement.onblur = () => {
      let title = field[index].nativeElement.textContent.trim();
      if (!title) {
        this.deleteTask(event, task);
        return;
      }
      let query = {
        id: task.id,
        name: title
      };
      this.taskService.editTask(query).subscribe(
        response => {
          if (response.results) {
            this.updateTaskList.emit();
          }
        }
      );
    };
  }

  deleteTask(event, task) {
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
