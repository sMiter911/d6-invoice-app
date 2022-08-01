import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/invoiceusers';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private _invoiceService: InvoiceService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      cname: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addUser() {
    this.user = {
      email: this.userForm.value.email,
      first_name: this.userForm.value.fname,
      last_name: this.userForm.value.lname,
      company_name: this.userForm.value.cname,
      phone_number: this.userForm.value.contact,
      address: this.userForm.value.address,
    };
    console.log(this.user);

    this._invoiceService.addUser(this.user).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate([`/invoice-users`]);
  }
}
