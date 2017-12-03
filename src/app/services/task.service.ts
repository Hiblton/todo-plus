import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './../services/api.service';

const API_GET_TASKS = 'api/tasks';

@Injectable()
export class TaskService {

  constructor(private apiService: ApiService) { }

  getAllTasks(): Observable<any> {
    return this.apiService.getMethod(API_GET_TASKS);
  }
}
