import { Component, input, computed, signal, inject } from '@angular/core';
import { DUMMY_USERS } from "../dummy-users";
import { Task } from "./task/task";
import { NewTask } from "./new-task/new-task";
import { TasksService } from "./tasks.service";
@Component({
  selector: 'app-tasks',
  imports: [Task, NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private tasksService = inject(TasksService);

  id = input<string>();
  nameUser = computed(() => DUMMY_USERS.find(user => user.id === this.id())?.name);
  tasksUser = computed(() => this.tasksService.getUserTasks(this.id()));
  isAddingTask = signal<boolean>(false);


  onStartAddTask(): void {
    this.isAddingTask.set(true);
  }

  onClose(): void {
    this.isAddingTask.set(false);
  }
}
