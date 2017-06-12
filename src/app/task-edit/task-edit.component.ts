import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  providers: [TaskService]
})
export class TaskEditComponent implements OnInit {
  id: number;
  task: Task = new Task();

  constructor(private taskService: TaskService, private router: Router, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
    console.log('id', this.id);
    if (this.id) {
      this.task = taskService.getTaskById(this.id);
    } else {
      this.task = new Task();
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submit', this.task);
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task);
    } else {
      this.taskService.addTask(this.task);
    }
    this.router.navigate(['']);
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
