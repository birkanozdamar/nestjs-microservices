export interface SignInCustomerServiceResponseType {
  status: boolean;
  customer: Customer;
  message: string;
}

export interface Customer {
  email: string;
  id: number;
  name: string;
  phone: string;
  company: string;
}

export interface CreateCustomerServiceResponseType {
  status: boolean;
  customer: Customer;
  message: string;
}

export interface FindAllCustomerServiceResponseType {
  status: boolean;
  customers: Customer[];
  message: string;
}

export interface FindCustomerServiceResponseType {
  status: boolean;
  customer: Customer;
  message: string;
}

export interface AssignRoleCustomerServiceResponseType {
  status: boolean;
  message: string;
}
