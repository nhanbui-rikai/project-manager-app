interface User {
  id?: string;
  userName?: string;
  phoneNumber?: string;
  gender?: boolean;
  bio?: string;
  role?: string;
}

interface RegisterForm {
  email: string;
  password: string;
  userName: string;
  role: string;
}

interface ChangePassForm {
  currentPassword: string;
  newPassword: string;
  userId: string;
}
