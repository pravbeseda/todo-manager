import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import * as moment from 'moment';
import { Task } from './task';

@Injectable()
export class TaskService {
  lastId: number;
  tasks: Task[];

  constructor(private ls: LocalStorageService) {
    this.loadTasksFromStorage();
  }

  loadTasksFromStorage() {
    this.tasks = this.ls.get('tasks')['items'] || [];
    this.lastId = this.ls.get('tasks')['lastId'] || 0;
  }

  saveTasksToStorage() {
    this.ls.set('tasks', {
      'items': this.tasks,
      'lastId': this.lastId
    });
  }

/**
 * Метод для изменения списка извне,
 * используется в обработчике события onUpdate Sortablejs
 */
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
    console.log('task added', task);
    this.saveTasksToStorage();
    return this;
  }

  deleteTaskById(id: number): TaskService {
    if (typeof(id) === 'string') {
      id = parseInt(id, 10);
    }
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasksToStorage();
    return this;
  }

  updateTask(id: number, values: Object = {}): Task {
    const task = this.getTaskById(id);

    if (!task) {
      return null;
    }

    Object.assign(task, values);
    console.log('task updated', task);
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
    console.log('isExpired', days);
    return (days < 0);
  }

  isWarning(task: Task) {
    if (task.complete || !task.date || !moment(task.date).isValid()) {
      return false;
    }
    const days: number = moment(task.date).diff(moment(), 'days');
    console.log('isWarning', days);
    return (days <= 3 && days >= 0);
  }

}
