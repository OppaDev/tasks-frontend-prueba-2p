import { Task } from "../models/Task";
import TaskService from "../services/TaskService";

export default class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  async createTask(task: Task): Promise<Task> {
    return await this.taskService.createTask(task);
  }

  async updateTask(task: Task): Promise<Task> {
    return await this.taskService.updateTask(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }
}