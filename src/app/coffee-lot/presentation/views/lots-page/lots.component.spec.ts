import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { CoffeeLotApi } from '../../../application/coffee-lot.api';
import { LotsComponent } from './lots.component';
import { SupplierApi } from '../../../../supplier/application/supplier.api';

describe('LotsComponent', () => {
  let component: LotsComponent;
  let fixture: ComponentFixture<LotsComponent>;

  beforeEach(async () => {
    const coffeeLotApiSpy = jasmine.createSpyObj<CoffeeLotApi>('CoffeeLotApi', ['getAll']);
    const supplierApiSpy = jasmine.createSpyObj<SupplierApi>('SupplierApi', ['getAll']);
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'logout',
      'getCurrentUser',
      'getCurrentUserId',
    ]);
    const dashboardNavigationSpy = jasmine.createSpyObj<DashboardNavigationService>(
      'DashboardNavigationService',
      ['goToHome'],
    );
    const dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    coffeeLotApiSpy.getAll.and.returnValue(of([]));
    supplierApiSpy.getAll.and.returnValue(of([]));
    authServiceSpy.getCurrentUserId.and.returnValue('1');
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(false),
    } as never);

    await TestBed.configureTestingModule({
      imports: [LotsComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CoffeeLotApi, useValue: coffeeLotApiSpy },
        { provide: SupplierApi, useValue: supplierApiSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DashboardNavigationService, useValue: dashboardNavigationSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
