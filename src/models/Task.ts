export interface ITask {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export class Task implements ITask {
  constructor(
    public title: string,
    public description: string,
    public completed: boolean = false,
    public id?: number,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
