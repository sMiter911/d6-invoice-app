export interface Item {
  status: string;
  data: InvoiceItem[];
}

export interface InvoiceItem {
  id: number;
  order_id: string;
  item_code: string;
  item_name: string;
  order_item_quantity: number;
  order_item_price: number;
  tax_item: Boolean;
}
