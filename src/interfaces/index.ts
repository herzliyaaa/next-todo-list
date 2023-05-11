export interface User {
  id?: number;
  name: string;
}

export interface Task {
  taskId: number;
  taskName: string;
  completed: boolean;
}
export interface List {
  id: number;
  name: string;
  task: Task[];
}
