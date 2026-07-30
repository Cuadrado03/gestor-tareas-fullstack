import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateTaskDto, Task, UpdateTaskDto } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskFormModalComponent } from '../task-form-modal/task-form-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = false;
  loadError: string | null = null;
  isModalOpen = false;
  taskBeingEdited: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.loadError = null;

    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.loadError = 'No se pudieron cargar las tareas.';
        this.isLoading = false;
      },
    });
  }
  openCreateModal(): void {
    this.taskBeingEdited = null;
    this.isModalOpen = true;
  }

  openEditModal(task: Task): void {
    this.taskBeingEdited = task;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSaveTask(dto: CreateTaskDto | UpdateTaskDto): void {
    const request$ = this.taskBeingEdited
      ? this.taskService.update(this.taskBeingEdited.id, dto)
      : this.taskService.create(dto as CreateTaskDto);

    request$.subscribe({
      next: () => {
        this.closeModal();
        this.loadTasks();
      },
      error: (err) => {
        alert('No se pudo guardar la tarea.'); 
      },
    });
  }
}