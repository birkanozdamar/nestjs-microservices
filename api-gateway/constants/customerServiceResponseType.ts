export interface SignInCustomerServiceResponseType {
  status: boolean;
  customer: CustomerType;
  message: string;
}

export interface CustomerType {
  email: string;
  id: number;
  name: string;
  phone: string;
  company: string;
}

export interface CreateCustomerServiceResponseType {
  status: boolean;
  customer: CustomerType;
  message: string;
}

export interface FindAllCustomerServiceResponseType {
  status: boolean;
  customers: CustomerType[];
  message: string;
}

export interface FindCustomerServiceResponseType {
  status: boolean;
  customer: CustomerType;
  message: string;
}

export interface AssignRoleCustomerServiceResponseType {
  status: boolean;
  message: string;
}

export interface CreateCustomerNoteServiceResponseType {
  status: boolean;
  customerNote: CustomerNoteType;
  message: string;
}

export interface GetCustomerNotesServiceResponseType {
  status: boolean;
  customerNotes: CustomerNoteType[];
  message: string;
}

export interface UpdateCustomerNoteServiceResponseType {
  status: boolean;
  customerNote: CustomerNoteType;
  message: string;
}

export interface CustomerNoteType {
  _id: string;
  customer_not: string;
  customer_id: number;
  created_by_id: number;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
