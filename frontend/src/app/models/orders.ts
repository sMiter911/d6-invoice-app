export interface Orders {
  order_item_quantity: any;
  order_item_price: any;
  item_name: any;
  item_code: any;
  status: string;
  data: InvoiceOrder[];
}

export interface InvoiceOrder {
  due_date: Date;
  id?: number;
  invoice_number: string;
  notes: string;
  order_date: Date;
  other?: number;
  subtotal: number;
  tax: number;
  tax_due: number;
  taxable: number;
  total: number;
  user_id: number;
}
