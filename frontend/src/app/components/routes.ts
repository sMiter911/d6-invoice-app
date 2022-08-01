import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'invoice-users',
        loadChildren: () =>
          import('./invoice-users/invoice-users.module').then(
            (m) => m.InvoiceUsersModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'add-invoice',
        loadChildren: () =>
          import('./add-invoice/add-invoice.module').then(
            (m) => m.AddInvoiceModule
          ),
      },
      {
        path: 'add-user',
        loadChildren: () =>
          import('./add-user/add-user.module').then((m) => m.AddUserModule),
      },
    ],
  },
];
