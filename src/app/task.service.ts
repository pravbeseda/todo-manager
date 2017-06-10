import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskService {
  lastId = 0;
  tasks: Task[] = [];

  constructor() { }

  /*
  * Имитируем метод POST при обращении к /tasks
  * */
  addTask(task: Task): TaskService {
    if (!task.title) {
      return null;
    }
    task.id = ++this.lastId;
    this.tasks.push(task);
    return this;
  }

  /*
   * Имитируем метод DELETE при обращении к /tasks/:id
   * */
  deleteTaskById(id: number): TaskService {
    this.tasks = this.tasks.filter( task => task.id !== id );
    return this;
  }

  /*
   * Имитируем метод PUT при обращении к /tasks/:id
   * */
  updateTaskById(id: number, values: Object = {}): Task {
      const task = this.getTaskById( id );

      if (!task) {
        return null;
      }

      Object.assign(task, values);

      return task;
    }

    /*
     * Имитируем метод GET при обращении к /tasks
     * */
    getAllTasks(): Task[] {
      return this.tasks;
    }

    /*
     * Имитируем метод GET при обращении к /tasks/:id
     * */
    getTaskById(id: number): Task {
      return this.tasks.filter( task => task.id === id ).pop();
    }

    /*
     * Изменить статус записи
     * */
    toggleTaskComplete(task: Task) {
      return this.updateTaskById(task.id, {
        complete: !task.complete
      });
    }
  }
