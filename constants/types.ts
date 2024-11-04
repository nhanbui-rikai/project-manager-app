export interface User {
  id?: string;
  email?: string;
  userName?: string;
  phoneNumber?: string;
  gender?: boolean;
  bio?: string;
  role?: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  userName: string;
  role: string;
}

export interface ChangePassForm {
  currentPassword: string;
  newPassword: string;
  userId: string;
}

export interface TaskContext {
  members?: User[];
  currentUser?: any;
  setMembers?: any;
}

export interface TaskFormValues {
  title: string;
  description: string;
  estimatedHour: number;
  actualHour: number;
  date: Date;
  members: User[];
  isCompleted: boolean;
}

export interface TaskData {
  id?: string;
  title?: string;
  description?: string;
  estimatedHour?: number;
  actualHour?: number;
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: Date;
  assignedTo?: Array<User>;
  status?: string;
}
