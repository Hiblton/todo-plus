import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import { ApiService } from './api.service';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, {provide: ApiService, useValue: {}}]
    });
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));
});
