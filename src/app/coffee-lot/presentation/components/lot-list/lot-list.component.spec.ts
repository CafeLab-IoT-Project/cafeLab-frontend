import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { SupplierApi } from '../../../../supplier/application/supplier.api';
import { Supplier } from '../../../../supplier/domain/model/supplier.entity';
import { CoffeeLotApi } from '../../../application/coffee-lot.api';
import { CoffeeLot } from '../../../domain/model/coffee-lot.entity';
import { LotListComponent } from './lot-list.component';

describe('LotListComponent', () => {
  let component: LotListComponent;
  let fixture: ComponentFixture<LotListComponent>;
  let coffeeLotApiSpy: jasmine.SpyObj<CoffeeLotApi>;
  let supplierApiSpy: jasmine.SpyObj<SupplierApi>;

  const mockSuppliers: Supplier[] = [
    {
      id: 1,
      userId: 11,
      name: 'Cafe Beans SAC',
      email: 'ventas@cafebeans.pe',
      phone: 987654321,
      location: 'Lima',
      specialties: ['Cafe'],
    },
  ];

  const mockLots: CoffeeLot[] = [
    {
      id: 1,
      userId: 7,
      supplier_id: 1,
      lot_name: 'Lote Cajamarca 001',
      coffee_type: 'Arábica',
      processing_method: 'Lavado',
      altitude: 1800,
      weight: 72,
      certifications: ['Orgánico'],
      origin: 'Peru',
      status: 'green',
    },
    {
      id: 2,
      userId: 7,
      supplier_id: 1,
      lot_name: 'Lote Cusco 002',
      coffee_type: 'Robusta',
      processing_method: 'Natural',
      altitude: 1500,
      weight: 65,
      certifications: [],
      origin: 'Peru',
      status: 'roasted',
    },
  ];

  beforeEach(async () => {
    coffeeLotApiSpy = jasmine.createSpyObj<CoffeeLotApi>('CoffeeLotApi', [
      'getAll',
      'searchLots',
      'create',
      'update',
      'delete',
    ]);
    supplierApiSpy = jasmine.createSpyObj<SupplierApi>('SupplierApi', ['getAll']);
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'getCurrentUserId',
    ]);

    coffeeLotApiSpy.getAll.and.returnValue(of(mockLots));
    coffeeLotApiSpy.searchLots.and.returnValue(of(mockLots));
    coffeeLotApiSpy.create.and.returnValue(of(mockLots[0]));
    coffeeLotApiSpy.update.and.returnValue(of(mockLots[0]));
    coffeeLotApiSpy.delete.and.returnValue(of(void 0));
    supplierApiSpy.getAll.and.returnValue(of(mockSuppliers));
    authServiceSpy.getCurrentUserId.and.returnValue('7');

    await TestBed.configureTestingModule({
      imports: [LotListComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CoffeeLotApi, useValue: coffeeLotApiSpy },
        { provide: SupplierApi, useValue: supplierApiSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        BREADCRUMB: {
          COFFEE_LOTS: 'Coffee lots',
        },
        SEARCH: {
          PLACEHOLDER: 'Search lot',
        },
        COMMON: {
          LOADING: 'Loading',
          DELETING: 'Deleting',
        },
        TABLE: {
          HEADER: {
            NAME: 'Name',
            COFFEE_TYPE: 'Coffee type',
            ALTITUDE: 'Altitude',
            SUPPLIER: 'Supplier',
            ACTIONS: 'Actions',
          },
          NO_LOTS: 'No lots found',
        },
        FORM: {
          LABEL: {
            STATUS: 'Status',
            NAME: 'Name',
            COFFEE_TYPE: 'Coffee type',
            ALTITUDE: 'Altitude',
            ORIGIN: 'Origin',
            WEIGHT: 'Weight',
            PROCESS: 'Process',
            SUPPLIER: 'Supplier',
            CERTIFICATIONS: 'Certifications',
            NOT_ASSIGNED: 'Not assigned',
            NO_CERTIFICATIONS: 'No certifications',
          },
          STATUS_OPTIONS: {
            GREEN: 'Green',
            ROASTED: 'Roasted',
          },
          SELECT_PLACEHOLDER: {
            SELECT_TYPE: 'Select type',
            SELECT_PROCESS: 'Select process',
            SELECT_SUPPLIER: 'Select supplier',
            SELECT_STATUS: 'Select status',
            SELECT_CERTIFICATION: 'Select certification',
          },
        },
        BUTTON: {
          VIEW: 'View',
          EDIT: 'Edit',
          DELETE: 'Delete',
          REGISTER_LOT: 'Register lot',
          REGISTER: 'Register',
          CANCELR: 'Cancel',
          CANCEL: 'Cancel',
          SAVE: 'Save',
          ADD: 'Add',
          REMOVE: 'Remove',
        },
        MODAL: {
          NEW_COFFEE_LOT: 'New coffee lot',
          LOT_DETAILS: 'Lot details',
          EDIT_LOT: 'Edit lot',
          DELETE_CONFIRMATION: {
            TITLE: 'Delete lot',
            MESSAGE: 'Delete?',
            CONFIRM: 'Confirm',
            CANCEL: 'Cancel',
          },
        },
        NAV: {
          LOTS: 'Lots',
        },
        COFFEE_LOT_BC: {
          HINT: {
            NEED_SUPPLIER: 'You need a supplier first',
            SUPPLIER_FIXED_ON_EDIT: 'Supplier cannot be edited',
          },
          ERRORS: {
            LOAD: 'Could not load lots',
            SEARCH: 'Could not search lots',
            REGISTER: 'Could not register lot',
            UPDATE: 'Could not update lot',
            DELETE: 'Could not delete lot',
            LOAD_SUPPLIERS: 'Could not load suppliers',
            NETWORK: 'Network error',
            UNAUTHORIZED: 'Unauthorized',
            NOT_FOUND: 'Lot not found',
            GENERIC: 'Unexpected lot error',
            MISSING_ID: 'Missing lot id',
          },
          VALIDATION: {
            SUMMARY: 'Please correct the highlighted fields',
            LOT_NAME: 'Lot name is required',
            COFFEE_TYPE: 'Coffee type is required',
            PROCESSING_METHOD: 'Processing method is required',
            ALTITUDE: 'Altitude must be greater than zero',
            WEIGHT: 'Weight must be greater than zero',
            ORIGIN: 'Origin is required',
            STATUS: 'Status is required',
            SUPPLIER: 'Supplier is required',
            NO_SUPPLIERS: 'At least one supplier is required',
          },
          OPTIONS: {
            COFFEE_TYPE: {
              ARABICA: 'Arabica',
              ROBUSTA: 'Robusta',
              BLEND: 'Blend',
            },
            PROCESSING: {
              ANAEROBIC: 'Anaerobic',
              WASHED: 'Washed',
              NATURAL: 'Natural',
              HONEY: 'Honey',
            },
            CERTIFICATION: {
              FAIR_TRADE: 'Fair Trade',
              BIRD_FRIENDLY: 'Bird Friendly',
              UTZ: 'UTZ',
              ORGANIC: 'Organic',
              RAINFOREST: 'Rainforest',
            },
          },
        },
      },
      true,
    );
    translate.use('en');

    fixture = TestBed.createComponent(LotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mocked coffee lots in the list', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Lote Cajamarca 001');
    expect(fixture.nativeElement.textContent).toContain('Lote Cusco 002');
    expect(fixture.nativeElement.textContent).toContain('Cafe Beans SAC');
  });

  it('should call the mocked lot services on initialization', () => {
    expect(coffeeLotApiSpy.getAll).toHaveBeenCalledTimes(1);
    expect(supplierApiSpy.getAll).toHaveBeenCalledTimes(1);
    expect(component.lots).toEqual(mockLots);
    expect(component.suppliers).toEqual(mockSuppliers);
  });

  it('should require an associated supplier before registering a lot', () => {
    component.newLot = {
      id: 0,
      userId: 0,
      supplier_id: 0,
      lot_name: 'Nuevo lote',
      coffee_type: 'Arábica',
      processing_method: 'Lavado',
      altitude: 1700,
      weight: 70,
      certifications: [],
      origin: 'Peru',
      status: 'green',
    };

    component.registerLot();

    expect(component.fieldErrors['supplier_id']).toBe('Supplier is required');
    expect(coffeeLotApiSpy.create).not.toHaveBeenCalled();
  });
});
