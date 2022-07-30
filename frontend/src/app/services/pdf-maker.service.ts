import { Injectable } from '@angular/core';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as pdfMake from 'pdfmake/build/pdfmake';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakerService {
  constructor() {}

  makePdf(invoice, invoiceItems, user) {
    const documentDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [30, 50, 30, 30],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        documentTitle: {
          fontSize: 15,
          bold: true,
          color: 'black',
        },
        headerStyle: {
          fontSize: 8,
          bold: true,
          color: 'black',
        },
        footerStyle: {
          fontSize: 8,
          bold: true,
          color: 'black',
        },
        tableHeader: {
          fontSize: 9,
          bold: true,
          color: 'black',
        },
      },
      defaultStyle: {
        fontSize: 9,
      },
      content: [
        {
          text: 'ACME INDUSTRIES',
          fontSize: 16,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue',
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader',
        },
        {
          columns: [
            [
              {
                text: user.first_name + ' ' + user.last_name,
                bold: true,
              },
              { text: user.address },
              { text: user.email },
              { text: user.phone_number },
            ],
            [
              {
                text: `Date: ${invoice.order_date}`,
                alignment: 'right',
              },
              {
                text: `Due Date: ${invoice.due_date}`,
                alignment: 'right',
              },
              {
                text: `Invoice No : ${invoice.invoice_number}`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: 'Order Details',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Item Code', 'Item Name', 'Unit Cost', 'Qauntity'],
              ...invoiceItems.map((p) => [
                p.item_code,
                p.item_name,
                p.order_item_price,
                p.order_item_quantity,
              ]),
              [
                { text: 'Total Amount', colSpan: 3 },
                {},
                {},
                invoice.total.toFixed(2),
              ],
            ],
          },
        },
        {
          text: 'Notes',
          style: 'sectionHeader',
        },
        {
          text: invoice.notes,
          margin: [0, 0, 0, 15],
        },
        {
          columns: [
            [{ qr: `${user.first_name}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ],
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader',
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
