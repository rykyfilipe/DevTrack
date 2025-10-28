
export interface Stat {
  label: string;
  value: number;
}

export interface Activity{
  id: string;
  action: string;
  projectId?: string;
  taskId?: string | null;
  userId?: string;

  createdAt: Date;
  updatedAt?: Date;

  category?: string;
  description?: string;
}