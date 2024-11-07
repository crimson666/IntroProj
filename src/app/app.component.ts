import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AppendPipe } from './pipes/append.pipe';
import { UpperCasePipe } from '@angular/common';
import { DataService } from './services/data.service';
import { Data } from './interfaces/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgClass, NgStyle, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, AppendPipe, UpperCasePipe],
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
  data: string[] = [];
  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
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
}
