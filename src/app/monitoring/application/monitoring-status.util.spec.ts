import {
  resolveActuatorOutOfRange,
  resolveLotMonitoringStatus,
  valueStatus,
} from './monitoring-status.util';
import type { EnvironmentThreshold } from '../domain/model/environment-threshold.entity';
import type { TelemetryRecord } from '../domain/model/telemetry-record.entity';

describe('monitoring-status.util', () => {
  const threshold: EnvironmentThreshold = {
    id: 1,
    coffeeLotId: 10,
    minTemperature: 18,
    maxTemperature: 24,
    minHumidity: 45,
    maxHumidity: 60,
    syncIntervalSeconds: 10,
  };

  const latest: TelemetryRecord = {
    id: 1,
    coffeeLotId: 10,
    temperature: 20,
    humidity: 55,
    timestamp: '2026-06-15T10:00:00',
  };

  it('returns optimal when readings are inside configured thresholds', () => {
    expect(valueStatus(20, 18, 24)).toBe('optimal');
    expect(resolveLotMonitoringStatus(latest, threshold)).toBe('optimal');
  });

  it('returns critical when temperature is outside configured thresholds', () => {
    expect(valueStatus(27, 18, 24)).toBe('critical');
    expect(
      resolveLotMonitoringStatus({ ...latest, temperature: 27 }, threshold),
    ).toBe('critical');
  });

  it('returns warning when readings are near threshold boundaries', () => {
    expect(valueStatus(18.5, 18, 24)).toBe('warning');
    expect(
      resolveLotMonitoringStatus({ ...latest, temperature: 18.5 }, threshold),
    ).toBe('warning');
  });

  it('returns no_data when there is no latest telemetry record', () => {
    expect(resolveLotMonitoringStatus(null, threshold)).toBe('no_data');
  });

  it('returns unconfigured when thresholds are missing', () => {
    expect(resolveLotMonitoringStatus(latest, null)).toBe('unconfigured');
  });

  it('flags actuators when temperature or humidity are out of range', () => {
    expect(resolveActuatorOutOfRange(latest, threshold)).toEqual({
      temperatureOutOfRange: false,
      humidityOutOfRange: false,
    });

    expect(
      resolveActuatorOutOfRange({ ...latest, humidity: 70 }, threshold),
    ).toEqual({
      temperatureOutOfRange: false,
      humidityOutOfRange: true,
    });
  });
});
