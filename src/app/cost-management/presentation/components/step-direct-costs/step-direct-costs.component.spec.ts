import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  integerInRange,
  integerInRangeWorkers,
  maxDecimalPlaces,
} from '../../../domain/validators/production-cost.validators';
import { StepDirectCostsComponent } from './step-direct-costs.component';

describe('StepDirectCostsComponent', () => {
  let component: StepDirectCostsComponent;
  let fixture: ComponentFixture<StepDirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepDirectCostsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    const fb = new FormBuilder();

    fixture = TestBed.createComponent(StepDirectCostsComponent);
    component = fixture.componentInstance;
    component.formGroup = fb.group({
      rawMaterials: fb.group({
        costPerKg: [
          null,
          [Validators.required, Validators.min(0.01), Validators.max(100), maxDecimalPlaces(2)],
        ],
        quantity: [
          null,
          [Validators.required, Validators.min(0.01), Validators.max(70), maxDecimalPlaces(2)],
        ],
      }),
      labor: fb.group({
        hoursWorked: [null, [Validators.required, integerInRange(1, 60)]],
        costPerHour: [
          null,
          [Validators.required, Validators.min(0.1), Validators.max(100), maxDecimalPlaces(2)],
        ],
        numberOfWorkers: [1, [Validators.required, integerInRangeWorkers(1, 10)]],
      }),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate direct cost numeric fields when values are out of numeric rules', () => {
    component.formGroup.get('rawMaterials.costPerKg')?.setValue('12.345');
    component.formGroup.get('rawMaterials.quantity')?.setValue(5);
    component.formGroup.get('labor.hoursWorked')?.setValue(2.5);
    component.formGroup.get('labor.costPerHour')?.setValue(18.5);
    component.formGroup.get('labor.numberOfWorkers')?.setValue(2);
    fixture.detectChanges();

    expect(component.rmCostPerKg.hasError('maxDecimals')).toBeTrue();
    expect(component.lbHours.hasError('notInteger')).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });
});
