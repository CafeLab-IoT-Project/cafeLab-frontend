import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import type { MonitoredLotView } from '../../../domain/model/telemetry-record.entity';
import { MonitoringLotCardComponent } from './monitoring-lot-card.component';

describe('MonitoringLotCardComponent', () => {
  let component: MonitoringLotCardComponent;
  let fixture: ComponentFixture<MonitoringLotCardComponent>;

  const baseLot: MonitoredLotView = {
    lotId: 5,
    lotName: 'Lote Card',
    coffeeType: 'Typica',
    status: 'optimal',
    temperature: 20,
    humidity: 55,
    lastTimestamp: '2026-06-15T10:00:00',
    temperatureOutOfRange: false,
    humidityOutOfRange: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringLotCardComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringLotCardComponent);
    component = fixture.componentInstance;
    component.lot = baseLot;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map optimal status to translation key', () => {
    expect(component.statusLabelKey()).toBe('MONITORING.LOTS.STATUS.OPTIMAL');
  });

  it('should expose actuator message when humidity is out of range', () => {
    component.lot = {
      ...baseLot,
      status: 'critical',
      humidityOutOfRange: true,
    };

    expect(component.actuatorMessageKey()).toBe('MONITORING.LOTS.ACTUATOR_HUM');
  });

  it('should expose combined actuator message when both variables are out of range', () => {
    component.lot = {
      ...baseLot,
      status: 'critical',
      temperatureOutOfRange: true,
      humidityOutOfRange: true,
    };

    expect(component.actuatorMessageKey()).toBe('MONITORING.LOTS.ACTUATORS_BOTH');
  });
});
