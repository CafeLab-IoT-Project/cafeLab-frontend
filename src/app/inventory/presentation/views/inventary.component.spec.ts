import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AuthService } from '../../../auth/infrastructure/AuthService';
import { CoffeeLotApi } from '../../../coffee-lot/application/coffee-lot.api';
import { CoffeeLot } from '../../../coffee-lot/domain/model/coffee-lot.entity';
import { ToolbarComponent } from '../../../public/presentation/components/toolbar/toolbar.component';
import { DashboardNavigationService } from '../../../shared/infrastructure/dashboard-navigation.service';
import { SupplierApi } from '../../../supplier/application/supplier.api';
import { Supplier } from '../../../supplier/domain/model/supplier.entity';
import { InventoryApi } from '../../application/inventory.api';
import { InventoryEntry } from '../../domain/model/inventory-entry.entity';
import { ConsumptionTableComponent } from '../components/consumption-table/consumption-table.component';
import { InventaryComponent } from './inventary.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

@Component({
  selector: 'app-consumption-table',
  standalone: true,
  template: '',
})
class StubConsumptionTableComponent {
  @Input() consumptionEntries: InventoryEntry[] = [];
  @Input() lots: CoffeeLot[] = [];
}

describe('InventaryComponent', () => {
  let component: InventaryComponent;
  let fixture: ComponentFixture<InventaryComponent>;

  beforeEach(async () => {
    const inventoryApiSpy = jasmine.createSpyObj<InventoryApi>('InventoryApi', ['getAll', 'create']);
    const coffeeLotApiSpy = jasmine.createSpyObj<CoffeeLotApi>('CoffeeLotApi', ['getAll']);
    const supplierApiSpy = jasmine.createSpyObj<SupplierApi>('SupplierApi', ['getAll']);
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getCurrentUserId']);
    const dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    const dashboardNavigationSpy = jasmine.createSpyObj<DashboardNavigationService>(
      'DashboardNavigationService',
      ['goToHome'],
    );

    inventoryApiSpy.getAll.and.returnValue(of([]));
    coffeeLotApiSpy.getAll.and.returnValue(of([]));
    supplierApiSpy.getAll.and.returnValue(of([] as Supplier[]));
    authServiceSpy.getCurrentUserId.and.returnValue('7');

    await TestBed.configureTestingModule({
      imports: [
        InventaryComponent,
        TranslateModule.forRoot(),
        StubToolbarComponent,
        StubConsumptionTableComponent,
      ],
      providers: [
        provideRouter([]),
        { provide: InventoryApi, useValue: inventoryApiSpy },
        { provide: CoffeeLotApi, useValue: coffeeLotApiSpy },
        { provide: SupplierApi, useValue: supplierApiSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: DashboardNavigationService, useValue: dashboardNavigationSpy },
      ],
    })
      .overrideComponent(InventaryComponent, {
        remove: {
          imports: [ToolbarComponent, ConsumptionTableComponent],
        },
        add: {
          imports: [StubToolbarComponent, StubConsumptionTableComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(InventaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
