import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

/**
 * Vista del módulo Monitoreo IoT.
 *
 * Por ahora actúa como placeholder accesible desde los tres dashboards (barista, owner,
 * full). El contenido real (lecturas de sensores, gráficas en tiempo real, alertas) se
 * conectará cuando esté el endpoint del backend IoT.
 */
@Component({
  selector: 'app-monitoring-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatIconModule,
    ToolbarComponent,
    TranslatePipe,
  ],
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.css'],
})
export class MonitoringPageComponent {
  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
