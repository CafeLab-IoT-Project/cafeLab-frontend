import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CoffeeLotApi } from '../../../../coffee-lot/application/coffee-lot.api';
import type { CoffeeLot } from '../../../../coffee-lot/domain/model/coffee-lot.entity';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { EnvironmentThresholdApi } from '../../../application/environment-threshold.api';
import { TelemetryRecordApi } from '../../../application/telemetry-record.api';
import type { ChartPoint } from '../../../application/monitoring-analytics.util';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MonitoringTrendChartComponent } from '../../components/monitoring-trend-chart/monitoring-trend-chart.component';
import { MonitoringAnalyticsPageComponent } from './monitoring-analytics-page.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

@Component({
  selector: 'app-monitoring-trend-chart',
  standalone: true,
  template: '',
})
class StubMonitoringTrendChartComponent {
  @Input() temperaturePoints: ChartPoint[] = [];
  @Input() humidityPoints: ChartPoint[] = [];
}

const lots: CoffeeLot[] = [
  {
    id: 3,
    userId: 2,
    supplier_id: 1,
    lot_name: 'Lote Analytics',
    coffee_type: 'Bourbon',
    processing_method: 'Natural',
    altitude: 1600,
    weight: 50,
    certifications: [],
    origin: 'Junín',
    status: 'Activo',
  },
];

describe('MonitoringAnalyticsPageComponent', () => {
  let component: MonitoringAnalyticsPageComponent;
  let fixture: ComponentFixture<MonitoringAnalyticsPageComponent>;
  let telemetryRecordApiSpy: jasmine.SpyObj<TelemetryRecordApi>;
  let environmentThresholdApiSpy: jasmine.SpyObj<EnvironmentThresholdApi>;

  beforeEach(async () => {
    const coffeeLotApiSpy = jasmine.createSpyObj<CoffeeLotApi>('CoffeeLotApi', ['getAll']);
    telemetryRecordApiSpy = jasmine.createSpyObj<TelemetryRecordApi>('TelemetryRecordApi', [
      'getHistoryByCoffeeLotId',
    ]);
    environmentThresholdApiSpy = jasmine.createSpyObj<EnvironmentThresholdApi>(
      'EnvironmentThresholdApi',
      ['getByCoffeeLotId'],
    );

    coffeeLotApiSpy.getAll.and.returnValue(of(lots));
    telemetryRecordApiSpy.getHistoryByCoffeeLotId.and.returnValue(
      of([
        {
          id: 1,
          coffeeLotId: 3,
          temperature: 20,
          humidity: 55,
          timestamp: '2026-06-15T09:00:00',
        },
        {
          id: 2,
          coffeeLotId: 3,
          temperature: 21,
          humidity: 56,
          timestamp: '2026-06-15T10:00:00',
        },
      ]),
    );
    environmentThresholdApiSpy.getByCoffeeLotId.and.returnValue(
      of({
        id: 1,
        coffeeLotId: 3,
        minTemperature: 18,
        maxTemperature: 24,
        minHumidity: 45,
        maxHumidity: 60,
        syncIntervalSeconds: 10,
      }),
    );

    await TestBed.configureTestingModule({
      imports: [MonitoringAnalyticsPageComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: CoffeeLotApi, useValue: coffeeLotApiSpy },
        { provide: TelemetryRecordApi, useValue: telemetryRecordApiSpy },
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
      .overrideComponent(MonitoringAnalyticsPageComponent, {
        remove: { imports: [ToolbarComponent, MonitoringTrendChartComponent] },
        add: { imports: [StubToolbarComponent, StubMonitoringTrendChartComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MonitoringAnalyticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute analytics from mocked telemetry history and thresholds', fakeAsync(() => {
    tick();
    expect(telemetryRecordApiSpy.getHistoryByCoffeeLotId).toHaveBeenCalledWith(3);
    expect(component.avgTemperature).toBe(20.5);
    expect(component.avgHumidity).toBe(55.5);
    expect(component.temperaturePoints.length).toBe(2);
    expect(component.healthScore).not.toBeNull();
    expect(component.loadingAnalytics).toBeFalse();
  }));
});
