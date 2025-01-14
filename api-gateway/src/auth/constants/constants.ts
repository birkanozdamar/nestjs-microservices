export interface SignInUserServiceResponse {
  status: boolean;
  user: User;
  message: string;
}

export interface User {
  email: string;
  id: number;
  name: string;
}

export interface CreateUserServiceResponse {
  status: boolean;
  user: User;
  message: string;
}

export interface FindAllUserServiceResponse {
  status: boolean;
  users: User[];
  message: string;
}
