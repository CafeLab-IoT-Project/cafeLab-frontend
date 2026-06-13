import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import type { MonitoredLotView } from '../../../domain/model/telemetry-record.entity';

@Component({
  selector: 'app-monitoring-lot-card',
  standalone: true,
  imports: [DecimalPipe, MatIconModule, TranslatePipe],
  templateUrl: './monitoring-lot-card.component.html',
  styleUrls: ['./monitoring-lot-card.component.css'],
})
export class MonitoringLotCardComponent {
  @Input({ required: true }) lot!: MonitoredLotView;

  statusLabelKey(): string {
    const keys: Record<MonitoredLotView['status'], string> = {
      optimal: 'MONITORING.LOTS.STATUS.OPTIMAL',
      warning: 'MONITORING.LOTS.STATUS.WARNING',
      critical: 'MONITORING.LOTS.STATUS.CRITICAL',
      unconfigured: 'MONITORING.LOTS.STATUS.UNCONFIGURED',
      no_data: 'MONITORING.LOTS.STATUS.NO_DATA',
    };
    return keys[this.lot.status];
  }
}
