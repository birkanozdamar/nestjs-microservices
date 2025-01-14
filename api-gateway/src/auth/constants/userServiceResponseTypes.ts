export interface SignInUserServiceResponseType {
  status: boolean;
  user: User;
  message: string;
}

export interface User {
  email: string;
  id: number;
  name: string;
}

export interface CreateUserServiceResponseType {
  status: boolean;
  user: User;
  message: string;
}

export interface FindAllUserServiceResponseType {
  status: boolean;
  users: User[];
  message: string;
}

export interface FindUserServiceResponseType {
  status: boolean;
  user: User;
  message: string;
}

export interface AssignRoleUserServiceResponseType {
  status: boolean;
  message: string;
}
