import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/invoiceusers';
import { InvoiceOrder, Orders } from 'src/app/models/orders';
import { InvoiceService } from 'src/app/services/invoice.service';
import { PdfMakerService } from 'src/app/services/pdf-maker.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
})
export class AddInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  subTotal: number = 0;
  taxable: number = 0;
  taxDue: number = 0;
  total: number = 0;
  submit: boolean = false;
  invoiceClear: boolean = false;
  userId!: number;
  invoiceUser!: User;
  lengthValue: any;

  invoice!: InvoiceOrder;
  invoiceItems: Orders[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private pdfmaker: PdfMakerService,
    private location: Location
  ) {
    this.invoiceForm = this.formBuilder.group({
      tax: [14, Validators.required],
      invoice_number: '',
      orders: this.formBuilder.array([]),
      date: '',
      due_date: '',
      notes: '',
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['user'];
      if (this.userId) {
        this.getInvoiceUser(this.userId);
      }
    });
  }

  orders(): FormArray {
    return this.invoiceForm.get('orders') as FormArray;
  }

  goBack(): void {
    this.location.back();
  }

  getInvoiceUser(id: number) {
    this._invoiceService.getInvoiceUser(id).subscribe((data) => {
      this.invoiceUser = data.data[0];
      console.log(this.invoiceUser);
    });
  }

  newOrders(): FormGroup {
    return this.formBuilder.group({
      item_code: '',
      item_name: '',
      order_item_price: '',
      order_item_quantity: '',
      tax_item: '',
    });
  }

  addOrders() {
    this.orders().push(this.newOrders());
  }

  removeOrders(index: number) {
    this.orders().removeAt(index);
  }

  clearInvoice() {
    this.invoiceForm.reset();
    this.subTotal = 0;
    this.taxable = 0;
    this.taxDue = 0;
    this.total = 0;
    this.orders().clear();
    this.invoiceClear = !this.invoiceClear;
    this.submit = !this.submit;
  }

  onSubmit() {
    let orders = this.invoiceForm.value.orders;
    for (const element of orders) {
      this.subTotal += element.order_item_price * element.order_item_quantity;
      if (element.tax_item === true) {
        this.taxable += element.order_item_price * element.order_item_quantity;
      }
      let addInvoiceID = {
        ...element,
        order_id: this.invoiceForm.value.invoice_number,
      };
      this.invoiceItems.push(addInvoiceID);
    }
    this.taxDue = Math.round(this.taxable * (this.invoiceForm.value.tax / 100));
    this.total = parseInt((this.subTotal + this.taxDue).toFixed(2));
    this.submit = !this.submit;
    this.invoiceClear = !this.invoiceClear;

    let dueDate = new Date(this.invoiceForm.value.due_date);
    let orderDate = new Date(this.invoiceForm.value.date);

    this.invoice = {
      invoice_number: this.invoiceForm.value.invoice_number,
      due_date: new Date(dueDate),
      tax: this.invoiceForm.value.tax,
      subtotal: this.subTotal,
      taxable: this.taxable,
      tax_due: this.taxDue,
      total: this.total,
      user_id: this.userId,
      notes: this.invoiceForm.value.notes,
      order_date: new Date(orderDate),
    };

    this.saveInvoice(this.invoice);
    this.saveInvoiceItems(this.invoiceItems);
  }

  saveInvoiceItems(invoiceItems) {
    for (const element of invoiceItems) {
      this._invoiceService.addInvoiceItem(element).subscribe((data) => {
        console.log(data);
      });
    }
  }

  saveInvoice(invoice) {
    this._invoiceService.addInvoice(invoice).subscribe((data) => {
      console.log(data);
    });
  }

  generatePdf() {
    this.pdfmaker.makePdf(this.invoice, this.invoiceItems, this.invoiceUser);
  }
}
