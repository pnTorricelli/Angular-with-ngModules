import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { User } from './user/user';
import { Tasks } from './tasks/tasks';
import { DUMMY_USERS } from './dummy-users';
@Component({
  selector: 'app-root',
  imports: [HeaderComponent, User, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  users = DUMMY_USERS;

  activeUserId = signal<string | undefined>(undefined);

  onSelectUser(Id: string): void {
    console.log("L'usente selezionato ha id: " + Id);
    this.activeUserId.set(Id);
  }
}
