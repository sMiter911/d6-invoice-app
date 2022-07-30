import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/invoiceusers';
import { InvoiceItem } from 'src/app/models/item';
import { InvoiceOrder } from 'src/app/models/orders';
import { InvoiceService } from 'src/app/services/invoice.service';
import { PdfMakerService } from 'src/app/services/pdf-maker.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  userId!: number;
  invoiceUser!: User;
  invoiceOrders!: InvoiceOrder[];
  invoiceItems!: InvoiceItem[];

  constructor(
    private _invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private pdfMakerService: PdfMakerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['user'];
      if (this.userId) {
        this.getInvoiceUser(this.userId);
        this.getUserInvoices(this.userId);
        this.getAllInvoiceItems();
      }
    });
  }

  getInvoiceUser(id: number) {
    this._invoiceService.getInvoiceUser(id).subscribe((data) => {
      this.invoiceUser = data.data[0];
      console.log(this.invoiceUser);
    });
  }

  getUserInvoices(id: number) {
    this._invoiceService.getUserInvoices(id).subscribe((data) => {
      this.invoiceOrders = data.data;
      console.log(this.invoiceOrders);
    });
  }

  getAllInvoiceItems() {
    this._invoiceService.getAllInvoiceItems().subscribe((data) => {
      this.invoiceItems = data.data;
      console.log(this.invoiceItems);
    });
  }

  addInvoice(id: number) {
    this.router.navigate(['/add-invoice'], { queryParams: { user: id } });
  }

  async generateInvoice(id: number) {
    console.log(id);
    let invoice = this.invoiceOrders.find((order) => order.id === id);
    let invoiceItems = this.invoiceItems.filter(
      (item) => item.order_id === invoice.invoice_number
    );
    console.log(invoice);
    console.log(this.invoiceItems);
    await this.pdfMakerService.makePdf(invoice, invoiceItems, this.invoiceUser);
  }
}
