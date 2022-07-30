import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/invoiceusers';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-users',
  templateUrl: './invoice-users.component.html',
  styleUrls: ['./invoice-users.component.scss'],
})
export class InvoiceUsersComponent implements OnInit {
  invoiceUsers!: User[];

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.getInvoiceUsers();
  }

  public getInvoiceUsers() {
    this.invoiceService.getInvoiceUsers().subscribe((data) => {
      this.invoiceUsers = data.data;
      console.log(this.invoiceUsers);
    });
  }

  viewUsers(id: number) {
    this.router.navigate(['/orders'], { queryParams: { user: id } });
  }
}
