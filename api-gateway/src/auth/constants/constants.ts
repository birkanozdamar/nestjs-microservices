export interface SignInUserServiceResponse {
  status: boolean;
  user: {
    email: string;
    id: number;
    name: string;
  };
}
