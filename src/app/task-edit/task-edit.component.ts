import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  providers: [ TaskService ]
})
export class TaskEditComponent implements OnInit {
  task: Task = new Task();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submit', this.task);
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task);
    } else {
      this.taskService.addTask(this.task);
    }
    // this.router.navigate(['TasksListComponent']);
  }
}
