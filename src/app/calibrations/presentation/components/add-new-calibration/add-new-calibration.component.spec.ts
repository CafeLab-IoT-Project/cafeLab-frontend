import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { GrindCalibrationApi } from '../../../../grind-calibration/application/grind-calibration.api';
import { AddNewCalibrationComponent } from './add-new-calibration.component';

describe('AddNewCalibrationComponent', () => {
  let component: AddNewCalibrationComponent;
  let fixture: ComponentFixture<AddNewCalibrationComponent>;
  let grindCalibrationApiSpy: jasmine.SpyObj<GrindCalibrationApi>;
  let router: Router;

  beforeEach(async () => {
    grindCalibrationApiSpy = jasmine.createSpyObj<GrindCalibrationApi>('GrindCalibrationApi', [
      'create',
    ]);
    grindCalibrationApiSpy.create.and.returnValue(
      of({
        ...{
          id: 1,
          userId: 7,
          name: 'Espresso base',
          method: 'Espresso',
          equipment: 'Maquina Espresso',
          grindNumber: '5-15',
          aperture: 58,
          cupVolume: 30,
          finalVolume: 25,
          calibrationDate: '2026-05-10',
          comments: '',
          notes: '',
          sampleImage: null,
        },
      }),
    );

    await TestBed.configureTestingModule({
      imports: [AddNewCalibrationComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), { provide: GrindCalibrationApi, useValue: grindCalibrationApiSpy }],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);

    fixture = TestBed.createComponent(AddNewCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the main calibration fields as required', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#name');
    const methodSelect: HTMLSelectElement = fixture.nativeElement.querySelector('#method');
    const equipmentSelect: HTMLSelectElement = fixture.nativeElement.querySelector('#equipment');
    const grindNumberSelect: HTMLSelectElement = fixture.nativeElement.querySelector('#grindNumber');
    const apertureSelect: HTMLSelectElement = fixture.nativeElement.querySelector('#aperture');
    const calibrationDateInput: HTMLInputElement =
      fixture.nativeElement.querySelector('#calibrationDate');

    expect(nameInput.required).toBeTrue();
    expect(methodSelect.required).toBeTrue();
    expect(equipmentSelect.required).toBeTrue();
    expect(grindNumberSelect.required).toBeTrue();
    expect(apertureSelect.required).toBeTrue();
    expect(calibrationDateInput.required).toBeTrue();
  });

  it('should not call the mocked service when the calibration date is missing', () => {
    component.calibration = {
      ...component.calibration,
      name: 'Espresso base',
      method: 'Espresso',
      equipment: 'Maquina Espresso',
      grindNumber: '5-15',
      calibrationDate: '',
    };

    component.onSubmit();

    expect(grindCalibrationApiSpy.create).not.toHaveBeenCalled();
  });

  it('should call the mocked service with valid calibration data', () => {
    component.calibration = {
      ...component.calibration,
      name: '  Espresso base  ',
      method: '  Espresso  ',
      equipment: '  Maquina Espresso  ',
      grindNumber: '  5-15  ',
      aperture: 60,
      cupVolume: 60,
      finalVolume: 50,
      calibrationDate: '2026-05-10T15:30:00.000Z',
      comments: '  Cuerpo balanceado  ',
      notes: '  Ajuste fino  ',
    };

    component.onSubmit();

    expect(grindCalibrationApiSpy.create).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        name: 'Espresso base',
        method: 'Espresso',
        equipment: 'Maquina Espresso',
        grindNumber: '5-15',
        aperture: 60,
        cupVolume: 60,
        finalVolume: 50,
        calibrationDate: '2026-05-10',
        comments: 'Cuerpo balanceado',
        notes: 'Ajuste fino',
      }),
    );
    expect(router.navigate).toHaveBeenCalledOnceWith(['/grind-calibration']);
  });
});
