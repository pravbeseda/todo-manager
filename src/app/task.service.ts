import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
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
    this.tasks = this.tasks.filter(task => task.id !== id);
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
    console.log('getAllTasks', this.tasks, this.ls.get('tasks'));
    return this.tasks;
  }

  getTaskById(id: number): Task {
    return this.tasks.filter(task => task.id === id).pop();
  }

  toggleTaskComplete(task: Task) {
    return this.updateTask(task.id, {
      complete: !task.complete
    });
  }
}
