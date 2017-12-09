import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './../services/api.service';

const API_TASKS = 'api/tasks/';

@Injectable()
export class TaskService {

  constructor(private apiService: ApiService) { }

  getAllTasks(): Observable<any> {
    return this.apiService.getMethod(API_TASKS);
  }

  addTask(task): Observable<any> {
    return this.apiService.postMethod(API_TASKS, task);
  }

  editTask(task): Observable<any> {
    return this.apiService.putMethod(API_TASKS + task.id, task);
  }

  deleteTask(task): Observable<any> {
    return this.apiService.deleteMethod(API_TASKS + task.id);
  }

  markAsDone(task): Observable<any> {
    return this.apiService.postMethod(API_TASKS + task.id);
  }
}
