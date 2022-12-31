export interface Contact {
  id: number;
  address: string;
  number?: string;
  landline_number?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}
