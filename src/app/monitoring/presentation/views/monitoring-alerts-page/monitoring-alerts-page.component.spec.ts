import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { MonitoringAlertApi } from '../../../application/monitoring-alert.api';
import type { MonitoringAlert } from '../../../domain/model/monitoring-alert.entity';
import { MonitoringAlertCardComponent } from '../../components/monitoring-alert-card/monitoring-alert-card.component';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MonitoringAlertsPageComponent } from './monitoring-alerts-page.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

@Component({
  selector: 'app-monitoring-alert-card',
  standalone: true,
  template: '',
})
class StubMonitoringAlertCardComponent {
  @Input({ required: true }) alert!: MonitoringAlert;
}

const alerts: MonitoringAlert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    title: 'Temperatura critica',
    description: 'La temperatura supero el umbral configurado',
    lotLabel: 'Lote A: Geisha',
    time: '10:00',
    occurredAt: '2026-06-15T10:00:00',
    metricIcon: 'device_thermostat',
    metricValue: '27 C',
    dismissed: false,
  },
  {
    id: 'alert-2',
    severity: 'warning',
    title: 'Humedad en alerta',
    description: 'La humedad se acerca al limite superior',
    lotLabel: 'Lote B: Caturra',
    time: '10:05',
    occurredAt: '2026-06-15T10:05:00',
    metricIcon: 'water_drop',
    metricValue: '59 %',
    dismissed: false,
  },
];

describe('MonitoringAlertsPageComponent', () => {
  let component: MonitoringAlertsPageComponent;
  let fixture: ComponentFixture<MonitoringAlertsPageComponent>;

  beforeEach(async () => {
    const monitoringAlertApiSpy = jasmine.createSpyObj<MonitoringAlertApi>(
      'MonitoringAlertApi',
      ['getAlerts'],
    );
    monitoringAlertApiSpy.getAlerts.and.returnValue(of(alerts));

    await TestBed.configureTestingModule({
      imports: [MonitoringAlertsPageComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: MonitoringAlertApi, useValue: monitoringAlertApiSpy },
        {
          provide: DashboardNavigationService,
          useValue: jasmine.createSpyObj<DashboardNavigationService>(
            'DashboardNavigationService',
            ['goToHome'],
          ),
        },
      ],
    })
      .overrideComponent(MonitoringAlertsPageComponent, {
        remove: { imports: [ToolbarComponent, MonitoringAlertCardComponent] },
        add: { imports: [StubToolbarComponent, StubMonitoringAlertCardComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MonitoringAlertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load alerts from mocked service', fakeAsync(() => {
    tick();
    expect(component.alerts.length).toBe(2);
    expect(component.pendingCount).toBe(2);
    expect(component.loading).toBeFalse();
  }));

  it('should filter visible alerts by severity', fakeAsync(() => {
    tick();
    component.setFilter('critical');
    expect(component.visibleAlerts.length).toBe(1);
    expect(component.visibleAlerts[0].severity).toBe('critical');
  }));

  it('should dismiss all alerts when mark all as read is triggered', fakeAsync(() => {
    tick();
    component.markAllAsRead();
    expect(component.visibleAlerts.length).toBe(0);
    expect(component.markAllMessage).toBe('MONITORING.ALERTS.MARK_ALL_SUCCESS');
  }));
});
