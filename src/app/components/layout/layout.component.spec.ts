import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragulaModule } from 'ng2-dragula';

import { LayoutComponent } from './layout.component';
import { DayslineComponent } from '../daysline/daysline.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../../services/task.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        DayslineComponent,
        TaskListComponent
      ],
      providers: [
        {
          provide: TaskService, useValue: {
            getAllTasks: () => {
              return {
                subscribe: () => {
                }
              };
            }
          }
        }
      ],
      imports: [
        DragulaModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
