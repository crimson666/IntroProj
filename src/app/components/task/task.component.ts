import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() val!: string;
  @Output() deleteTask = new EventEmitter<void>();

  OnDelete() {
    this.deleteTask.emit();
  }

}
