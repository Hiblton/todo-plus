import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, {provide: HttpClient, useValue: {}}]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
