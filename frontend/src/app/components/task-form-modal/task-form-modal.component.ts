import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTaskDto, Task, TASK_STATUS_LABELS, UpdateTaskDto } from '../../models/task.model';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.scss',
})
export class TaskFormModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() task: Task | null = null;

  @Output() save = new EventEmitter<CreateTaskDto | UpdateTaskDto>();
  @Output() closed = new EventEmitter<void>();

  readonly statusLabels = TASK_STATUS_LABELS;
  readonly statuses = Object.keys(TASK_STATUS_LABELS) as Array<keyof typeof TASK_STATUS_LABELS>;

  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['pending', [Validators.required]],
  });

  get isEditMode(): boolean {
    return !!this.task;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      this.form.reset({
        title: this.task?.title ?? '',
        description: this.task?.description ?? '',
        status: this.task?.status ?? 'pending',
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.save.emit({
      title: value.title!.trim(),
      description: value.description?.trim() || '',
      status: value.status as CreateTaskDto['status'],
    });
  }

  onClose(): void {
    this.closed.emit();
  }
}