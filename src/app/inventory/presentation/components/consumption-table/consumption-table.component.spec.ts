import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { CoffeeLot } from '../../../../coffee-lot/domain/model/coffee-lot.entity';
import { InventoryEntry } from '../../../domain/model/inventory-entry.entity';
import { ConsumptionTableComponent } from './consumption-table.component';

describe('ConsumptionTableComponent', () => {
  let component: ConsumptionTableComponent;
  let fixture: ComponentFixture<ConsumptionTableComponent>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ConsumptionTableComponent, TranslateModule.forRoot()],
      providers: [{ provide: MatDialog, useValue: dialogSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mocked consumption entries in the table', () => {
    const lots: CoffeeLot[] = [
      {
        id: 1,
        userId: 7,
        supplier_id: 4,
        lot_name: 'Lote Arandano',
        coffee_type: 'Arábica',
        processing_method: 'Lavado',
        altitude: 1800,
        weight: 12.5,
        certifications: [],
        origin: 'Cusco',
        status: 'green',
      },
    ];
    const entries: InventoryEntry[] = [
      {
        id: 11,
        userId: 7,
        coffeeLotId: 1,
        quantityUsed: 2.5,
        dateUsed: '2026-05-10T10:00:00.000Z',
        finalProduct: 'Cold brew',
      },
    ];

    component.lots = lots;
    component.consumptionEntries = entries;
    component.ngOnChanges();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    const text = fixture.nativeElement.textContent;

    expect(component.tableData.length).toBe(1);
    expect(rows.length).toBe(1);
    expect(text).toContain('Lote Arandano');
    expect(text).toContain('2.5');
    expect(text).toContain('12.5');
  });
});
