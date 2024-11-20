import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgClass, NgStyle } from '@angular/common';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AppendPipe } from './pipes/append.pipe';
import { UpperCasePipe } from '@angular/common';
import { DataService } from './services/data.service';
import { Data } from './interfaces/data';
import { UserService } from './services/user.service';
import { signal, computed } from '@angular/core';
import { Todo } from './interfaces/todo';
import { User } from './interfaces/user';
import { Post } from './interfaces/post';
import { MessegeService } from './services/messege.service';
import { latestprices, orderBook, students } from './interfaces/store';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    JsonPipe,
    ReactiveFormsModule
  ],
  providers: [DataService, MessegeService],
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

  userInfo: User = {
    name: '',
    email: '',
  };
  Posts: Post[] = [];
  UserFrom2!: FormGroup;


  constructor(private dataService: DataService,
    private userService: UserService,
    private messegeService: MessegeService,
    private formBuilder: FormBuilder) {
    this.data = this.dataService.getData();
    //so effcts do nearly the same thisg like signal but does not return anything
    effect(() => {
      const items = this.todos().length;
      const even = items % 2 === 0 ? 'even' : 'odd';
      console.log(`Total number of items: ${items} which is ${even}`);
    });

    this.UserFrom2 = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address2: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
      }),
      hobbies: ['', Validators.required],
      phoneNos: this.formBuilder.array([
        this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]),
      ])
    });

  }
  //end of constructor

  get phone(): FormArray {
    return this.UserFrom2.get('phoneNos') as FormArray;
  }

  addPhoneNumber() {
    this.phone.push(this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]));
  }

  deletePhoneNumber(i: number) {
    if (this.phone.length > 1) {
      this.phone.removeAt(i);
    }
  }

  submitUserForm() {
    if (this.UserFrom2.valid) {
      const user = this.UserFrom2.value;
      console.log(user);
    }
  }

  consoleFormData() {
    const user = this.UserFrom2.value;
    console.log(user);
  }

  data2: Data[] = [];
  //studentsData: students = [];


  ngOnInit() {
    this.dataService.getPosts().subscribe({
      next: (res: Data[]) => {
        this.data2 = res;
      },
      error: (err: Error) => {
        console.log('Error', err);
      }
    })

    this.messegeService.getStudentsPosts().subscribe({
      next: (res: students) => {
        console.log(res);
      },
      error: (err: Error) => {
        console.log('Error', err);
      }
    })

    this.messegeService.getoutorderPosts().subscribe({
      next: (res: orderBook) => {
        console.log(res);
      },
      error: (err: Error) => {
        console.log('Error', err);
      }
    })

    this.messegeService.getlatestpricesPosts().subscribe({
      next: (res: latestprices) => {
        console.log(res);
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

  submitForm(form: NgForm) {
    if (form.valid) {
      console.log(form.value, this.userInfo);
    }
  }

  validateEmail(): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(this.userInfo?.email);
  }
}
