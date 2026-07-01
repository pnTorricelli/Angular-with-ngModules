import { Component, input, output, signal, inject } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import type { NewTaskInterface } from './new-task.model';
@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  userId = input<string>();

  close = output<void>();

  addTask = output<NewTaskInterface>()

  enteredTitle = signal<string>("");

  enteredSummary = signal<string>("");

  enteredDate = signal<string>("");

  private tasksService = inject(TasksService);

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    const userId = this.userId();
    if (!userId) {
      return;
    }
    this.tasksService.addTask(userId, {
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      date: this.enteredDate()
    })
    this.close.emit();
  }

}
