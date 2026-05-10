import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { ViewCalibrationComponent } from '../../components/view-calibration/view-calibration.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-view-calibration-page',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, ViewCalibrationComponent, TranslatePipe],
  templateUrl: './view-calibration-page.component.html',
  styleUrls: ['./view-calibration-page.component.css', '../calibration-breadcrumb-shell.css'],
})
export class ViewCalibrationPageComponent {
  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
