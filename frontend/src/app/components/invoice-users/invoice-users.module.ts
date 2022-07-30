import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceUsersComponent } from './invoice-users/invoice-users.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: InvoiceUsersComponent }];

@NgModule({
  declarations: [InvoiceUsersComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [InvoiceUsersComponent, RouterModule],
})
export class InvoiceUsersModule {}
