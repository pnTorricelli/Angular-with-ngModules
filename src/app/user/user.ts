import { Component, computed, input, Input, signal, Output, EventEmitter, output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import type { UserInterface } from './user.model';
import { Card } from '../shared/card/card';

/*
  Helper usato negli esempi sotto per selezionare casualmente
  un utente tra quelli presenti nell'array DUMMY_USERS.
*/
const randomActiveUser = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [Card],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  /*
    ============================================================
    1. INPUT CLASSICI - DECORATORE @Input()
    ============================================================

    Questo è il modo "classico" di Angular per ricevere dati
    da un componente padre.

    Esempio nel componente padre:

      <app-user
        [avatar]="user.avatar"
        [name]="user.name"
      />

    @Input({ required: true }) indica che il valore deve essere
    obbligatoriamente passato dal componente padre.

    Il simbolo ! dice a TypeScript:
    "questa proprietà verrà valorizzata da Angular, anche se qui
    non la sto inizializzando subito".
  */
  @Input({ required: true }) user!: UserInterface;
  @Output() select = new EventEmitter<string>();
  selected = input<boolean>(false);

  /*
    Proprietà calcolata tramite getter classico.

    imagePath non contiene un valore salvato in memoria.
    Viene ricalcolata ogni volta che Angular legge questa proprietà.

    Nel template posso usarla così:

      <img [src]="imagePath" [alt]="name" />
  */
  get imagePath(): string {
    return 'users/' + this.user.avatar;
  }


  onSelectUser(): void {
    this.select.emit(this.user.id);
  }
  /*
    ============================================================
    2. INPUT MODERNI - FUNZIONE input()
    ============================================================

    Questo è il modo più moderno di Angular per definire input
    usando i signal input.

  */

  /*
  // Input moderno con valore di default.
  // Se il padre non passa avatar, il valore iniziale sarà stringa vuota.
  avatar = input<string>('');

  // Input moderno obbligatorio.
  // Se uso input.required<T>(), non posso dare un valore di default.
  name = input.required<string>();


  // Output moderno .
  select = output<string>();


  // Computed derivata dall'input signal avatar.
  // Con input(), avatar non si legge più come this.avatar,
  // ma come this.avatar().
  imagePath = computed((): string => {
    return 'users/' + this.avatar();
  });
  */

  /*
    ============================================================
    3. STATO INTERNO CLASSICO - PROPRIETÀ NORMALI
    ============================================================

    Questo è il modo più tradizionale per gestire uno stato interno
    del componente.

    In questo caso il componente NON riceve avatar e name dal padre,
    ma sceglie internamente un utente dall'array DUMMY_USERS.

  */

  /*
  selectedUser = DUMMY_USERS[randomActiveUser];

  get imagePath(): string {
    return 'users/' + this.selectedUser.avatar;
  }

  onSelectUser(): void {
    const randomActiveUser = Math.floor(Math.random() * DUMMY_USERS.length);

    this.selectedUser = DUMMY_USERS[randomActiveUser];

    console.log('Clicked');
  }
  */

  /*
    ============================================================
    4. STATO INTERNO MODERNO - SIGNAL E COMPUTED
    ============================================================

    Questo è il modo moderno di Angular per gestire uno stato interno
    reattivo nel componente.

    signal() crea un valore reattivo.
    computed() crea un valore derivato da uno o più signal.

    Differenza importante:

      Proprietà normale:
        this.selectedUser

      Signal:
        this.selectedUser()

    Per modificare un signal si usa:

      .set(nuovoValore)

    oppure:

      .update(valoreCorrente => nuovoValore)
  */

  /*
  selectedUser = signal(DUMMY_USERS[randomActiveUser]);

  imagePath = computed((): string => {
    return 'users/' + this.selectedUser().avatar;
  });

  onSelectUser(): void {
    const randomActiveUser = Math.floor(Math.random() * DUMMY_USERS.length);

    this.selectedUser.set(DUMMY_USERS[randomActiveUser]);
  }
  */
}
