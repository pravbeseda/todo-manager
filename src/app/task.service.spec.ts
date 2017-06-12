import { TestBed, inject } from '@angular/core/testing';
import { Task } from './task';
import { TaskService } from './task.service';
import { LocalStorageService } from 'angular-2-local-storage';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, LocalStorageService]
    });
  });

  it('должен быть запущен', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

});
