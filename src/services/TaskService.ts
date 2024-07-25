import ApiService from './ApiService';
import { Task } from '../models/Task';

export default class TaskService extends ApiService {
  async getTasks(): Promise<Task[]> {
    const response = await this.get('/tasks/');
    return response.data.map((task: any) => new Task(task.title, task.description, task.completed, task.id));
  }

  async createTask(task: Task): Promise<Task> {
    const response = await this.post('/tasks/', task);
    return new Task(response.data.title, response.data.description, response.data.completed, response.data.id);
  }

  async updateTask(task: Task): Promise<Task> {
    const response = await this.api.put(`/tasks/${task.id}/`, task);
    return new Task(response.data.title, response.data.description, response.data.completed, response.data.id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.api.delete(`/tasks/${id}/`);
  }
}