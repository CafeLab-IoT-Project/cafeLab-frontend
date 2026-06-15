import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { MonitoredLotApi } from '../../../application/monitored-lot.api';
import type { MonitoredLotView } from '../../../domain/model/telemetry-record.entity';
import { MonitoringLotCardComponent } from '../../components/monitoring-lot-card/monitoring-lot-card.component';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MonitoringLotsPageComponent } from './monitoring-lots-page.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

@Component({
  selector: 'app-monitoring-lot-card',
  standalone: true,
  template: '',
})
class StubMonitoringLotCardComponent {
  @Input({ required: true }) lot!: MonitoredLotView;
}

const monitoredLots: MonitoredLotView[] = [
  {
    lotId: 1,
    lotName: 'Lote A',
    coffeeType: 'Geisha',
    status: 'optimal',
    temperature: 20.5,
    humidity: 55,
    lastTimestamp: '2026-06-15T10:00:00',
    temperatureOutOfRange: false,
    humidityOutOfRange: false,
  },
  {
    lotId: 2,
    lotName: 'Lote B',
    coffeeType: 'Caturra',
    status: 'critical',
    temperature: 27,
    humidity: 70,
    lastTimestamp: '2026-06-15T10:05:00',
    temperatureOutOfRange: true,
    humidityOutOfRange: true,
  },
];

describe('MonitoringLotsPageComponent', () => {
  let component: MonitoringLotsPageComponent;
  let fixture: ComponentFixture<MonitoringLotsPageComponent>;
  let monitoredLotApiSpy: jasmine.SpyObj<MonitoredLotApi>;

  beforeEach(async () => {
    monitoredLotApiSpy = jasmine.createSpyObj<MonitoredLotApi>('MonitoredLotApi', [
      'getMonitoredLots',
    ]);
    monitoredLotApiSpy.getMonitoredLots.and.returnValue(of(monitoredLots));

    await TestBed.configureTestingModule({
      imports: [MonitoringLotsPageComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: MonitoredLotApi, useValue: monitoredLotApiSpy },
        {
          provide: DashboardNavigationService,
          useValue: jasmine.createSpyObj<DashboardNavigationService>(
            'DashboardNavigationService',
            ['goToHome'],
          ),
        },
      ],
    })
      .overrideComponent(MonitoringLotsPageComponent, {
        remove: { imports: [ToolbarComponent, MonitoringLotCardComponent] },
        add: { imports: [StubToolbarComponent, StubMonitoringLotCardComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MonitoringLotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load monitored lots from mocked service', fakeAsync(() => {
    tick();
    expect(monitoredLotApiSpy.getMonitoredLots).toHaveBeenCalled();
    expect(component.monitoredLots.length).toBe(2);
    expect(component.filteredLots.length).toBe(2);
    expect(component.loading).toBeFalse();
  }));

  it('should compute active lots and alert counters', fakeAsync(() => {
    tick();
    expect(component.activeLotsCount).toBe(2);
    expect(component.alertsCount).toBe(1);
    expect(component.telemetryCoveragePercent).toBe(100);
  }));

  it('should filter lots by search query', fakeAsync(() => {
    tick();
    component.searchQuery = 'geisha';
    component.onSearchChange();
    expect(component.filteredLots.length).toBe(1);
    expect(component.filteredLots[0].lotName).toBe('Lote A');
  }));
});
