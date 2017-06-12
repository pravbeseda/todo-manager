import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
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
    console.log('onSorted', this.tasks);
    this.taskService.updateTasks(this.tasks);
  }

}
