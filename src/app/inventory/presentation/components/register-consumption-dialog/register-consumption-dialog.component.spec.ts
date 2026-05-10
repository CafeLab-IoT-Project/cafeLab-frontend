import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CoffeeLotApi } from '../../../../coffee-lot/application/coffee-lot.api';
import { CoffeeLot } from '../../../../coffee-lot/domain/model/coffee-lot.entity';
import { InventoryApi } from '../../../application/inventory.api';
import { RegisterConsumptionDialogComponent } from './register-consumption-dialog.component';

describe('RegisterConsumptionDialogComponent', () => {
  let component: RegisterConsumptionDialogComponent;
  let fixture: ComponentFixture<RegisterConsumptionDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RegisterConsumptionDialogComponent>>;
  let inventoryApiSpy: jasmine.SpyObj<InventoryApi>;

  const availableLots: CoffeeLot[] = [
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

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<RegisterConsumptionDialogComponent>>(
      'MatDialogRef',
      ['close'],
    );
    inventoryApiSpy = jasmine.createSpyObj<InventoryApi>('InventoryApi', ['getAll', 'create']);
    const coffeeLotApiSpy = jasmine.createSpyObj<CoffeeLotApi>('CoffeeLotApi', ['getAll']);

    inventoryApiSpy.getAll.and.returnValue(of([]));
    coffeeLotApiSpy.getAll.and.returnValue(of(availableLots));

    await TestBed.configureTestingModule({
      imports: [RegisterConsumptionDialogComponent, TranslateModule.forRoot()],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            coffeeStatus: 'green',
            coffeeType: 'Arábica',
            availableLots,
          },
        },
        { provide: InventoryApi, useValue: inventoryApiSpy },
        { provide: CoffeeLotApi, useValue: coffeeLotApiSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterConsumptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the form invalid when used quantity is zero', () => {
    component.form.setValue({
      date: new Date('2026-05-10T10:00:00.000Z'),
      lotId: 1,
      finalProduct: 'Cold brew',
      consumptionKg: 0,
    });

    component.submit();

    expect(component.form.invalid).toBeTrue();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close with the normalized payload and avoid backend calls on valid submit', () => {
    component.form.setValue({
      date: new Date('2026-05-10T10:00:00.000Z'),
      lotId: 1,
      finalProduct: '  Cold brew  ',
      consumptionKg: 2.5,
    });

    component.submit();

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        coffeeLotId: 1,
        quantityUsed: 2.5,
        finalProduct: 'Cold brew',
      }),
    );
    expect(inventoryApiSpy.create).not.toHaveBeenCalled();
  });
});
