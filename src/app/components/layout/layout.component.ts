import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { AdDirective } from '../../directives/ad.directive';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  @ViewChild(AdDirective) adHost: AdDirective;
  tasks = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private taskService: TaskService) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      response => {
        if (response) {
          this.tasks = response.results;
          this.loadComponent();
        }
      }
    );
  }

  updateTaskList() {
    this.getAllTasks();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TaskListComponent);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.tasks = this.tasks;
  }

}
