import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CoffeeLotApi } from '../../../../coffee-lot/application/coffee-lot.api';
import type { CoffeeLot } from '../../../../coffee-lot/domain/model/coffee-lot.entity';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { EnvironmentThresholdApi } from '../../../application/environment-threshold.api';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MonitoringConfigurationPageComponent } from './monitoring-configuration-page.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

const lots: CoffeeLot[] = [
  {
    id: 1,
    userId: 3,
    supplier_id: 2,
    lot_name: 'Lote Norte',
    coffee_type: 'Geisha',
    processing_method: 'Lavado',
    altitude: 1800,
    weight: 60,
    certifications: ['Orgánico'],
    origin: 'Cusco',
    status: 'Activo',
  },
];

describe('MonitoringConfigurationPageComponent', () => {
  let component: MonitoringConfigurationPageComponent;
  let fixture: ComponentFixture<MonitoringConfigurationPageComponent>;
  let environmentThresholdApiSpy: jasmine.SpyObj<EnvironmentThresholdApi>;
  let translate: TranslateService;

  beforeEach(async () => {
    const coffeeLotApiSpy = jasmine.createSpyObj<CoffeeLotApi>('CoffeeLotApi', ['getAll']);
    environmentThresholdApiSpy = jasmine.createSpyObj<EnvironmentThresholdApi>(
      'EnvironmentThresholdApi',
      ['getByCoffeeLotId', 'save'],
    );

    coffeeLotApiSpy.getAll.and.returnValue(of(lots));
    environmentThresholdApiSpy.getByCoffeeLotId.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [MonitoringConfigurationPageComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: CoffeeLotApi, useValue: coffeeLotApiSpy },
        { provide: EnvironmentThresholdApi, useValue: environmentThresholdApiSpy },
        {
          provide: DashboardNavigationService,
          useValue: jasmine.createSpyObj<DashboardNavigationService>(
            'DashboardNavigationService',
            ['goToHome'],
          ),
        },
      ],
    })
      .overrideComponent(MonitoringConfigurationPageComponent, {
        remove: { imports: [ToolbarComponent] },
        add: { imports: [StubToolbarComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MonitoringConfigurationPageComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lots and default threshold form when no configuration exists', () => {
    expect(component.lots.length).toBe(1);
    expect(component.selectedLotId).toBe(1);
    expect(component.thresholdExists).toBeFalse();
    expect(component.formValues.minTemperature).toBe(18.5);
  });

  it('should block save when temperature range is invalid', () => {
    component.formValues = {
      ...component.formValues,
      minTemperature: 25,
      maxTemperature: 20,
    };

    component.saveConfiguration();

    expect(environmentThresholdApiSpy.save).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe(
      translate.instant('MONITORING.CONFIGURATION.ERRORS.TEMP_RANGE'),
    );
  });

  it('should persist configuration when form values are valid', () => {
    environmentThresholdApiSpy.save.and.returnValue(
      of({
        id: 9,
        coffeeLotId: 1,
        minTemperature: 18.5,
        maxTemperature: 24,
        minHumidity: 45,
        maxHumidity: 60,
        syncIntervalSeconds: 10,
      }),
    );

    component.saveConfiguration();

    expect(environmentThresholdApiSpy.save).toHaveBeenCalled();
    expect(component.thresholdExists).toBeTrue();
    expect(component.successMessage).toBe(
      translate.instant('MONITORING.CONFIGURATION.SUCCESS.SAVED'),
    );
  });
});
