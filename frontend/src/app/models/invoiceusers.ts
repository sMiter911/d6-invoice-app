export interface InvoiceUser {
  status: string;
  data: User[];
}

export interface User {
  address: string;
  company_name: string;
  created_at?: string;
  email: string;
  first_name: string;
  id?: number;
  last_name: string;
  phone_number: string;
  updated_at?: string;
}
