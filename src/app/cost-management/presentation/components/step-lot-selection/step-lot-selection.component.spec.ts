import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CoffeeLot } from '../../../../coffee-lot/domain/model/coffee-lot.entity';
import { StepLotSelectionComponent } from './step-lot-selection.component';

describe('StepLotSelectionComponent', () => {
  let component: StepLotSelectionComponent;
  let fixture: ComponentFixture<StepLotSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepLotSelectionComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(StepLotSelectionComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      selectedLot: new FormControl('', Validators.required),
      currency: new FormControl('PEN', Validators.required),
    });
    component.lots = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow selecting a mocked lot', () => {
    const lots: CoffeeLot[] = [
      {
        id: 9,
        userId: 7,
        supplier_id: 4,
        lot_name: 'Lote Bourbon',
        coffee_type: 'Arábica',
        processing_method: 'Lavado',
        altitude: 1850,
        weight: 42.5,
        certifications: [],
        origin: 'Cusco',
        status: 'green',
      },
    ];

    component.lots = lots;
    component.formGroup.get('selectedLot')?.setValue(9);
    fixture.detectChanges();

    expect(component.lots.length).toBe(1);
    expect(component.formGroup.get('selectedLot')?.value).toBe(9);
  });
});
