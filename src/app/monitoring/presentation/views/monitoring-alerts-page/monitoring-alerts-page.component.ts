import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import type {
  MonitoringAlert,
  MonitoringAlertFilter,
} from '../../../domain/model/monitoring-alert.entity';
import { MonitoringAlertCardComponent } from '../../components/monitoring-alert-card/monitoring-alert-card.component';

@Component({
  selector: 'app-monitoring-alerts-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatIconModule,
    RouterLink,
    ToolbarComponent,
    TranslatePipe,
    MonitoringAlertCardComponent,
  ],
  templateUrl: './monitoring-alerts-page.component.html',
  styleUrls: ['./monitoring-alerts-page.component.css'],
})
export class MonitoringAlertsPageComponent {
  activeFilter: MonitoringAlertFilter = 'all';
  markAllMessage = '';

  alerts: MonitoringAlert[] = [
    {
      id: '1',
      severity: 'critical',
      titleKey: 'MONITORING.ALERTS.ITEMS.TEMP_PEAK.TITLE',
      descriptionKey: 'MONITORING.ALERTS.ITEMS.TEMP_PEAK.DESCRIPTION',
      lotLabelKey: 'MONITORING.ALERTS.ITEMS.TEMP_PEAK.LOT',
      timeKey: 'MONITORING.ALERTS.ITEMS.TEMP_PEAK.TIME',
      metricIcon: 'device_thermostat',
      metricValueKey: 'MONITORING.ALERTS.ITEMS.TEMP_PEAK.METRIC',
      action: 'action',
      actionKey: 'MONITORING.ALERTS.ACTIONS.TAKE_ACTION',
    },
    {
      id: '2',
      severity: 'warning',
      titleKey: 'MONITORING.ALERTS.ITEMS.HUMIDITY.TITLE',
      descriptionKey: 'MONITORING.ALERTS.ITEMS.HUMIDITY.DESCRIPTION',
      lotLabelKey: 'MONITORING.ALERTS.ITEMS.HUMIDITY.LOT',
      timeKey: 'MONITORING.ALERTS.ITEMS.HUMIDITY.TIME',
      metricIcon: 'water_drop',
      metricValueKey: 'MONITORING.ALERTS.ITEMS.HUMIDITY.METRIC',
      action: 'resolve',
      actionKey: 'MONITORING.ALERTS.ACTIONS.RESOLVE',
    },
    {
      id: '3',
      severity: 'warning',
      titleKey: 'MONITORING.ALERTS.ITEMS.BATTERY.TITLE',
      descriptionKey: 'MONITORING.ALERTS.ITEMS.BATTERY.DESCRIPTION',
      lotLabelKey: 'MONITORING.ALERTS.ITEMS.BATTERY.LOT',
      timeKey: 'MONITORING.ALERTS.ITEMS.BATTERY.TIME',
      metricIcon: 'battery_alert',
      metricValueKey: 'MONITORING.ALERTS.ITEMS.BATTERY.METRIC',
      action: 'acknowledge',
      actionKey: 'MONITORING.ALERTS.ACTIONS.ACKNOWLEDGE',
    },
    {
      id: '4',
      severity: 'info',
      titleKey: 'MONITORING.ALERTS.ITEMS.BATCH_DONE.TITLE',
      descriptionKey: 'MONITORING.ALERTS.ITEMS.BATCH_DONE.DESCRIPTION',
      lotLabelKey: 'MONITORING.ALERTS.ITEMS.BATCH_DONE.LOT',
      timeKey: 'MONITORING.ALERTS.ITEMS.BATCH_DONE.TIME',
      metricIcon: 'info',
      metricValueKey: 'MONITORING.ALERTS.ITEMS.BATCH_DONE.METRIC',
      action: 'report',
      actionKey: 'MONITORING.ALERTS.ACTIONS.VIEW_REPORT',
    },
  ];

  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  get visibleAlerts(): MonitoringAlert[] {
    return this.alerts.filter((alert) => {
      if (alert.dismissed) {
        return false;
      }
      if (this.activeFilter === 'all') {
        return true;
      }
      return alert.severity === this.activeFilter;
    });
  }

  get pendingCount(): number {
    return this.alerts.filter((alert) => !alert.dismissed).length;
  }

  setFilter(filter: MonitoringAlertFilter): void {
    this.activeFilter = filter;
    this.markAllMessage = '';
  }

  markAllAsRead(): void {
    this.alerts = this.alerts.map((alert) => ({ ...alert, dismissed: true }));
    this.markAllMessage = 'MONITORING.ALERTS.MARK_ALL_SUCCESS';
  }

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
