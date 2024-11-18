import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgClass, NgStyle } from '@angular/common';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AppendPipe } from './pipes/append.pipe';
import { UpperCasePipe } from '@angular/common';
import { DataService } from './services/data.service';
import { Data } from './interfaces/data';
import { UserService } from './services/user.service';
import { signal, computed } from '@angular/core';
import { Todo } from './interfaces/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NgClass,
    NgStyle,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    AppendPipe,
    UpperCasePipe,
    AsyncPipe,
    JsonPipe
  ],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'IntroProj';
  content: string = 'This is the main page';
  //Attribute building 
  isDisabled: boolean = false;
  //Style building 
  bgColor: string = 'blue';
  textColor: string = 'black';
  contentStyle: string = 'white-space: pre; font-size: 30px; color: red';

  //class binding
  redText: string = 'text-red';

  //twoday data binding
  countNm: number = 0;
  increment(): void {
    this.countNm++;
  }

  //two way data binding
  name: string = 'Ankur';
  address: string = 'Pune';

  //ngClass
  messege: string = 'Hello World';
  classes: string = 'danger text-size textColor';

  //ngStyle
  selectedColor: string = 'blue';

  //NgIf
  yes: boolean = true;
  no: boolean = false;
  elseCon: boolean = true;

  namesStr: string[] = ['Ankur', 'Ashish'];

  grade: string = 'A';

  a: number = 2;
  b: number = 3;
  c: number = 4;

  items = [
    { id: 1, name: 'Ankur' },
    { id: 2, name: 'Ashish' },
    { id: 3, name: 'Shubham' },
    { id: 4, name: 'Sourabh' }
  ]

  grade1: string = 'B';

  pipeValue: string = 'This is the main page';
  user = this.userService.getUser();
  data: string[] = [];
  //Example Json slash
  userData = {
    id: 1,
    name: 'shubham',
    roles: ['admin', 'user'],
    status: {
      active: true,
      lastLogin: new Date('01/03/2019')
    }
  };

  count2 = signal<number>(0);
  todos = signal<Todo[]>([]);
  newTodo = signal<string>('');
  // so computed is based on the event of a value we can return an signal, btw its a signal that has been returned
  totalToDoItems = computed(() => this.todos().length);

  constructor(private dataService: DataService, private userService: UserService) {
    this.data = this.dataService.getData();
    //so effcts do nearly the same thisg but does not return anything
    effect(() => {
      const items = this.todos().length;
      const even = items % 2 === 0 ? 'even' : 'odd';
      console.log(`Total number of items: ${items} which is ${even}`);
    });
  }

  data2: Data[] = [];
  ngOnInit() {
    this.dataService.getPosts().subscribe({
      next: (res: Data[]) => {
        this.data2 = res;
      },
      error: (err: Error) => {
        console.log('Error', err);
      }
    })
  }

  handleinput(event: Event) {
    const input = event?.target as HTMLInputElement;
    this.newTodo.set(input?.value);
  }

  addTooDo() {
    if (this.newTodo().trim().length) {
      const newTodoObj: Todo = {
        id: Date.now(),
        title: this.newTodo(),
        done: false,
      }
      this.todos.set([...this.todos(), newTodoObj]);
      this.newTodo.set('');
    }
  }

  deleteToDo(id: number) {
    const updatedTodos = this.todos().filter((todo) => todo?.id !== id);
    this.todos.set(updatedTodos);
  }
}
