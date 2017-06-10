import { TestBed, inject } from '@angular/core/testing';
import { Task } from './task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
  });

  it('должен быть запущен', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTasks()', () => {
      it('должен возвращать пустой массив по умолчанию', inject([TaskService], (service: TaskService) => {
        expect(service.getAllTasks()).toEqual([]);
      }) );

      it('должен возвращать все задачи', inject( [TaskService], (service: TaskService) => {
        const task1 = new Task({
          title: 'Задача 1',
          complete: false
        });
        const task2 = new Task({
          title: 'Задача 2',
          complete: true
        });

        service.addTask(task1);
        service.addTask(task2);
        expect(service.getAllTasks()).toEqual([task1, task2]);
      }));
    });

  describe('#addTask(task)', () => {
    it('должен автоматически назначать увеличенный Id', inject([TaskService], (service: TaskService) => {
      const task1 = new Task({
        title: 'Задача 1',
        complete: false
      });
      const task2 = new Task({
        title: 'Задача 2',
        complete: false
      });

        service.addTask(task1);
      service.addTask(task2);

      expect(service.getTaskById(1)).toEqual(task1);
      expect(service.getTaskById(2)).toEqual(task2);
    }) );
  });

  describe('#deleteTaskById(id)', () => {
    it('должен удалять task по id', inject([TaskService], (service: TaskService) => {
      const task1 = new Task({
        title: 'Задача 1',
        complete: false
      });
      const task2 = new Task({
        title: 'Задача 2',
        complete: true
      });

      service.addTask(task1);
      service.addTask(task2);

      expect(service.getAllTasks()).toEqual([task1, task2]);
      service.deleteTaskById(1);

      expect(service.getAllTasks()).toEqual([task2]);
      service.deleteTaskById(2);

      expect( service.getAllTasks() ).toEqual([]);
    }) );

    it('не должен ничего удалять, если task не найден по id', inject([TaskService], (service: TaskService) => {
      const task1 = new Task({
        title: 'Задача 1',
        complete: false
      });
      const task2 = new Task({
        title: 'Задача 1',
        complete: false
      });
      service.addTask(task1);
      service.addTask(task2);

      expect(service.getAllTasks()).toEqual([task1, task2]);
      service.deleteTaskById(3);
      expect(service.getAllTasks()).toEqual([task1, task2]);
    }) );
  });

  describe('#updateTaskById(id, values)', () => {

    it('должен изменять задачу по id и возвращать ее новый вариант', inject([TaskService], (service: TaskService) => {
      const task = new Task({
        title: 'Задача 1',
        complete: false
      });
      service.addTask(task);
      const updatedTask = service.updateTaskById(1, {
        title: 'Новое название'
      });

      expect(updatedTask.title).toEqual('Новое название');
    }));

    it('должен вернуть null, если task не найден', inject([TaskService], (service: TaskService) => {
      const task = new Task({
        title: 'Задача 1',
        complete: false
      });
      service.addTask(task);
      const updatedTask = service.updateTaskById(2, {
        title: 'новое название'
      });

      expect(updatedTask).toEqual(null);
    }));
  });

  describe('#toggleTaskComplete(task)', () => {
    it('должен вернуть обновленную задачу с противоположным статусом', inject([TaskService], (service: TaskService) => {
      const task = new Task({
        title: 'Задача 1',
        complete: false
      });

      service.addTask(task);
      const updatedTask = service.toggleTaskComplete(task);

      expect(updatedTask.complete).toEqual(true);
      service.toggleTaskComplete(task);
      expect(updatedTask.complete).toEqual(false);
    }) );
  });

});
