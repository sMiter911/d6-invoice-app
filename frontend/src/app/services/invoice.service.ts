import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvoiceUser, User } from '../models/invoiceusers';
import { InvoiceOrder, Orders } from '../models/orders';
import { InvoiceItem, Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly API_URL = environment.apiUrl;
  private readonly headers = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient) {}

  getInvoiceUsers(): Observable<InvoiceUser> {
    return this.http.get<InvoiceUser>(`${this.API_URL}/`);
  }

  getInvoiceUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  getUserInvoices(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${this.API_URL}/${id}/orders`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/`, user, {
      headers: this.headers,
    });
  }

  addInvoice(invoice: InvoiceOrder): Observable<InvoiceOrder> {
    return this.http.post<InvoiceOrder>(`${this.API_URL}/addinvoice`, invoice, {
      headers: this.headers,
    });
  }

  addInvoiceItem(item: InvoiceItem): Observable<InvoiceItem> {
    return this.http.post<InvoiceItem>(`${this.API_URL}/additem`, item, {
      headers: this.headers,
    });
  }

  getAllInvoiceItems(): Observable<Item> {
    return this.http.get<Item>(`${this.API_URL}/items`);
  }

  getInvoiceItems(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.API_URL}/${id}/items`);
  }
}
