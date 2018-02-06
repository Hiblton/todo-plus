import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragulaService } from 'ng2-dragula';

import { TaskListComponent } from './task-list.component';
import { TaskService } from './../../services/task.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        {provide: TaskService, useValue: {}},
        {provide: DragulaService, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TaskListComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
