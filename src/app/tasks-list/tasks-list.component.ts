import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import * as moment from 'moment';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [TaskService]
})
export class TasksListComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    moment.locale('ru');
    this.tasks = this.taskService.getAllTasks();
  }

  removeTask(id: number) {
    this.taskService.deleteTaskById(id);
  }

  toggleTaskComplete(task: Task) {
    this.taskService.toggleTaskComplete(task);
  }

  isExpired(task: Task) {
    return this.taskService.isExpired(task);
  }

  isWarning(task: Task) {
    return this.taskService.isWarning(task);
  }

  onSorted() {
    this.taskService.updateTasks(this.tasks);
  }

  dateDiff(date) {
    return moment(date).fromNow();
  }

}
