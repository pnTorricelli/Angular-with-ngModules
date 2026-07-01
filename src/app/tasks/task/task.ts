import { Component, input, inject } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Card } from '../../shared/card/card';
import { DatePipe } from '@angular/common';
import type { TaskInterface } from './task.model';

@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  task = input.required<TaskInterface>();
  private taskService = inject(TasksService);

  onCompleteTask(): void {
    this.taskService.removeTask(this.task().id);
  }
}
