import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [TaskService]
})
export class TasksListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  get tasks() {
    return this.taskService.getAllTasks();
  }

  removeTask(id: number) {
    this.taskService.deleteTaskById(id);
  }

  toggleTaskComplete(task: Task) {
    this.taskService.toggleTaskComplete(task);
  }

}
