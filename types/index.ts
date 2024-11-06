export interface ITask {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  assigned_to: string;
  actual_hours: string;
  estimate_hours: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  members: [];
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  start_date: Date | string;
  end_date: Date | string;
  members: [];
  tasks: ITask[];
}

export interface MemberProps {}
