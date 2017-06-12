import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import * as moment from 'moment';
import { Task } from './task';

@Injectable()
export class TaskService {
  lastId = 0;
  tasks: Task[] = [];

  constructor(private ls: LocalStorageService) {
    this.loadTasksFromStorage();
  }

  loadTasksFromStorage() {
    const savedData: Object = this.ls.get('tasks');
    if (savedData) {
      this.tasks = savedData['items'] || [];
      this.lastId = savedData['lastId'] || 0;
    }
  }

  saveTasksToStorage() {
    this.ls.set('tasks', {
      'items': this.tasks,
      'lastId': this.lastId
    });
  }

  updateTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.saveTasksToStorage();
  }

  addTask(task: Task): TaskService {
    if (!task.title) {
      return null;
    }
    task.id = ++this.lastId;
    this.tasks.push(task);
    this.saveTasksToStorage();
    return this;
  }

  deleteTaskById(id: number): TaskService {
    if (typeof(id) === 'string') {
      id = parseInt(id, 10);
    }
    this.updateTasks(this.tasks.filter(task => task.id !== id));
    return this;
  }

  updateTask(id: number, values: Object = {}): Task {
    const task = this.getTaskById(id);

    if (!task) {
      return null;
    }

    Object.assign(task, values);
    this.saveTasksToStorage();
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    if (typeof(id) === 'string') {
      id = parseInt(id, 10);
    }
    return this.tasks.filter(task => task.id === id).pop();
  }

  toggleTaskComplete(task: Task) {
    return this.updateTask(task.id, {
      complete: !task.complete
    });
  }

  isExpired(task: Task) {
    if (task.complete || !task.date || !moment(task.date).isValid()) {
      return false;
    }
    const days: number = moment(task.date).diff(moment(), 'days');
    return (days < 0);
  }

  isWarning(task: Task) {
    if (task.complete || !task.date || !moment(task.date).isValid()) {
      return false;
    }
    const days: number = moment(task.date).diff(moment(), 'days');
    return (days <= 3 && days >= 0);
  }

}
