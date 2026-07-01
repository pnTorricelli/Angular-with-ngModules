import { signal, Injectable } from '@angular/core';
import type { TaskInterface } from './task/task.model';
import type { NewTaskInterface } from './new-task/new-task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<TaskInterface[]>([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  constructor() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }


  getUserTasks(userId: string | undefined): TaskInterface[] {
    return this.tasks().filter(task => task.userId === userId);
  }

  addTask(userId: string, newTask: NewTaskInterface): void {
    const id = 't' + (this.tasks().length + 1).toString();

    this.tasks.update(tasks => [
      {
        id,
        userId,
        title: newTask.title,
        summary: newTask.summary,
        dueDate: newTask.date,
      },
      ...tasks,
    ]);
    this.updateLocalStorageTasks();
  }

  removeTask(id: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.updateLocalStorageTasks();
  }

  private updateLocalStorageTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks()));
  }
}
