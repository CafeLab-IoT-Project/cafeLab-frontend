import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { SupplierApi } from '../../../application/supplier.api';
import { Supplier } from '../../../domain/model/supplier.entity';
import { SupplierListComponent } from './supplier-list.component';

describe('SupplierListComponent', () => {
  let component: SupplierListComponent;
  let fixture: ComponentFixture<SupplierListComponent>;
  let supplierApiSpy: jasmine.SpyObj<SupplierApi>;
  let translate: TranslateService;

  const mockSuppliers: Supplier[] = [
    {
      id: 1,
      userId: 11,
      name: 'Cafe Beans SAC',
      email: 'ventas@cafebeans.pe',
      phone: 987654321,
      location: 'Lima',
      specialties: ['Cafe', 'Molinos'],
    },
    {
      id: 2,
      userId: 12,
      name: 'Milk Partners',
      email: 'contacto@milkpartners.pe',
      phone: 912345678,
      location: 'Arequipa',
      specialties: ['Leche'],
    },
  ];

  beforeEach(async () => {
    supplierApiSpy = jasmine.createSpyObj<SupplierApi>('SupplierApi', [
      'getAll',
      'searchSuppliers',
      'create',
      'update',
      'delete',
    ]);

    supplierApiSpy.getAll.and.returnValue(of(mockSuppliers));
    supplierApiSpy.searchSuppliers.and.returnValue(of(mockSuppliers));
    supplierApiSpy.create.and.returnValue(of(mockSuppliers[0]));
    supplierApiSpy.update.and.returnValue(of(mockSuppliers[0]));
    supplierApiSpy.delete.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [SupplierListComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SupplierApi, useValue: supplierApiSpy },
      ],
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        supply: {
          suppliers: {
            search_placeholder: 'Search supplier',
            register_button: 'Register supplier',
            loading: 'Loading suppliers',
            no_suppliers: 'No suppliers found',
            add_specialty_placeholder: 'Add specialty',
            details: { title: 'Supplier details' },
            columns: {
              name: 'Name',
              email: 'Email',
              phone: 'Phone',
              location: 'Location',
              specialties: 'Specialties',
            },
          },
        },
        SUPPLIER_BC: {
          CONFIRM_DELETE: 'Delete supplier?',
          ERRORS: {
            LOAD: 'Could not load suppliers',
            SEARCH: 'Could not search suppliers',
            REGISTER: 'Could not register supplier',
            UPDATE: 'Could not update supplier',
            DELETE: 'Could not delete supplier',
            NETWORK: 'Network error',
            UNAUTHORIZED: 'Unauthorized',
            NOT_FOUND: 'Supplier not found',
            GENERIC: 'Unexpected supplier error',
          },
          VALIDATION: {
            SUMMARY: 'Please correct the highlighted fields',
            NAME_REQUIRED: 'Name is required',
            EMAIL_REQUIRED: 'Email is required',
            EMAIL_INVALID: 'Email is invalid',
            PHONE_REQUIRED: 'Phone is required',
            PHONE_INVALID: 'Phone is invalid',
            LOCATION_REQUIRED: 'Location is required',
            SPECIALTIES_MAX: 'You can add up to 4 specialties',
            SPECIALTY_DUPLICATE: 'Specialty already added',
          },
        },
      },
      true,
    );
    translate.use('en');

    fixture = TestBed.createComponent(SupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mocked suppliers in the list', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Cafe Beans SAC');
    expect(fixture.nativeElement.textContent).toContain('Milk Partners');
  });

  it('should call the mocked supplier service to load data', () => {
    expect(supplierApiSpy.getAll).toHaveBeenCalledTimes(1);
    expect(supplierApiSpy.searchSuppliers).not.toHaveBeenCalled();
    expect(component.suppliers).toEqual(mockSuppliers);
  });

  it('should require supplier form fields before registering', () => {
    component.newSupplier = {
      id: 0,
      userId: 0,
      name: '',
      email: '',
      phone: 0,
      location: '',
      specialties: [],
    };

    component.registerSupplier();

    expect(component.registerFieldErrors['name']).toBe('Name is required');
    expect(component.registerFieldErrors['email']).toBe('Email is required');
    expect(component.registerFieldErrors['location']).toBe('Location is required');
    expect(supplierApiSpy.create).not.toHaveBeenCalled();
  });

  it('should reject invalid supplier email before registering', () => {
    component.newSupplier = {
      id: 0,
      userId: 0,
      name: 'Proveedor Demo',
      email: 'correo-invalido',
      phone: 987654321,
      location: 'Cusco',
      specialties: [],
    };

    component.registerSupplier();

    expect(component.registerFieldErrors['email']).toBe('Email is invalid');
    expect(supplierApiSpy.create).not.toHaveBeenCalled();
  });
});
