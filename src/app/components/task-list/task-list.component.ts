import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Array<Task> = [];
  @Output() updateTaskList = new EventEmitter<null>();
  @ViewChildren('editable_field') editableFields: QueryList<ElementRef>;

  constructor(private taskService: TaskService,
    private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
  }

  private onDrag(args) {
    const [e, el] = args;
    // do something
  }

  private onDrop(args) {
    const [e, el] = args;
    // do something
  }

  private onOver(args) {
    const [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    const [e, el, container] = args;
    // do something
  }

  toggleControls(task) {
    this.tasks.map(item => {
      item.showControls = item.selected = item.id === task.id;
    });
  }

  markAsDone(event, task) {
    // todo common task validation
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
      this.editableFields.last.nativeElement.contentEditable = true;
      this.editableFields.last.nativeElement.textContent = 'type..';
      this.editableFields.last.nativeElement.focus();
      this.editableFields.last.nativeElement.onblur = () => {
        const title = this.editableFields.last.nativeElement.textContent.trim();
        if (!title) {
          this.tasks.pop();
          return;
        }
        const query = {
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
    const field = this.editableFields.toArray();
    field[index].nativeElement.contentEditable = true;
    field[index].nativeElement.focus();
    field[index].nativeElement.onblur = () => {
      const title = field[index].nativeElement.textContent.trim();
      if (!title) {
        this.deleteTask(event, task);
        return;
      }
      const query = {
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
