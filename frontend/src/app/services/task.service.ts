import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiSuccessResponse, CreateTaskDto, Task, UpdateTaskDto } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http
      .get<ApiSuccessResponse<Task[]>>(this.baseUrl)
      .pipe(map((res) => res.data));
  }

  create(dto: CreateTaskDto): Observable<Task> {
    return this.http
      .post<ApiSuccessResponse<Task>>(this.baseUrl, dto)
      .pipe(map((res) => res.data));
  }

  update(id: string, dto: UpdateTaskDto): Observable<Task> {
    return this.http
      .put<ApiSuccessResponse<Task>>(`${this.baseUrl}/${id}`, dto)
      .pipe(map((res) => res.data));
  }

  delete(id: string): Observable<Task> {
    return this.http
      .delete<ApiSuccessResponse<Task>>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data));
  }
}