export type MonitoringAlertSeverity = 'critical' | 'warning' | 'info';

export type MonitoringAlertAction = 'action' | 'resolve' | 'acknowledge' | 'report';

export interface MonitoringAlert {
  id: string;
  severity: MonitoringAlertSeverity;
  titleKey: string;
  descriptionKey: string;
  lotLabelKey: string;
  timeKey: string;
  metricIcon: string;
  metricValueKey: string;
  action: MonitoringAlertAction;
  actionKey: string;
  dismissed?: boolean;
}

export type MonitoringAlertFilter = 'all' | 'critical' | 'warning';
