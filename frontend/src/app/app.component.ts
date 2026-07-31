import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Gestor de Tareas';
}