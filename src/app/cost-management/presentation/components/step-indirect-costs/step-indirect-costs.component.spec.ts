import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { integerInRange, maxDecimalPlaces } from '../../../domain/validators/production-cost.validators';
import { StepIndirectCostsComponent } from './step-indirect-costs.component';

describe('StepIndirectCostsComponent', () => {
  let component: StepIndirectCostsComponent;
  let fixture: ComponentFixture<StepIndirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepIndirectCostsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    const fb = new FormBuilder();

    fixture = TestBed.createComponent(StepIndirectCostsComponent);
    component = fixture.componentInstance;
    component.formGroup = fb.group({
      transport: fb.group({
        costPerKg: [
          null,
          [Validators.required, Validators.min(0.1), Validators.max(100), maxDecimalPlaces(2)],
        ],
        quantity: [
          null,
          [Validators.required, Validators.min(1), Validators.max(200), maxDecimalPlaces(2)],
        ],
      }),
      storage: fb.group({
        daysInStorage: [null, [Validators.required, integerInRange(1, 30)]],
        dailyCost: [
          null,
          [Validators.required, Validators.min(0.1), Validators.max(100), maxDecimalPlaces(2)],
        ],
      }),
      processing: fb.group({
        electricity: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
        maintenance: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
        supplies: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
        water: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
        depreciation: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
      }),
      others: fb.group({
        qualityControl: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
        certifications: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
        insurance: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
        administrative: [0, [Validators.required, Validators.min(0), Validators.max(200), maxDecimalPlaces(2)]],
      }),
    });
    component.onCancel = jasmine.createSpy('onCancel');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate indirect cost numeric fields when values break numeric rules', () => {
    const transportCostPerKg = component.formGroup.get('transport.costPerKg');
    const transportQuantity = component.formGroup.get('transport.quantity');
    const storageDaysInStorage = component.formGroup.get('storage.daysInStorage');
    const storageDailyCost = component.formGroup.get('storage.dailyCost');

    transportCostPerKg?.setValue('10.555');
    transportQuantity?.setValue(15);
    storageDaysInStorage?.setValue(2.5);
    storageDailyCost?.setValue(8.5);

    expect(transportCostPerKg?.hasError('maxDecimals')).toBeTrue();
    expect(storageDaysInStorage?.hasError('notInteger')).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });
});
