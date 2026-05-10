import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplyPageComponent } from './supply-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { SupplierApi } from '../../../application/supplier.api';
import { MatDialog } from '@angular/material/dialog';

describe('SupplyPageComponent', () => {
  let component: SupplyPageComponent;
  let fixture: ComponentFixture<SupplyPageComponent>;
  let supplierApiSpy: jasmine.SpyObj<SupplierApi>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dashboardNavigationSpy: jasmine.SpyObj<DashboardNavigationService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    supplierApiSpy = jasmine.createSpyObj<SupplierApi>('SupplierApi', ['getAll']);
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['logout', 'getCurrentUser']);
    dashboardNavigationSpy = jasmine.createSpyObj<DashboardNavigationService>(
      'DashboardNavigationService',
      ['goToHome'],
    );
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    supplierApiSpy.getAll.and.returnValue(of([]));
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(false),
    } as never);

    await TestBed.configureTestingModule({
      imports: [
        SupplyPageComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: SupplierApi, useValue: supplierApiSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DashboardNavigationService, useValue: dashboardNavigationSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
