import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUsersComponent } from './invoice-users.component';

describe('InvoiceUsersComponent', () => {
  let component: InvoiceUsersComponent;
  let fixture: ComponentFixture<InvoiceUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
