import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { AddNewCalibrationComponent } from '../../components/add-new-calibration/add-new-calibration.component';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-add-calibration-page',
  standalone: true,
  imports: [AddNewCalibrationComponent, MatToolbar, ToolbarComponent, TranslatePipe],
  templateUrl: './add-calibration-page.component.html',
  styleUrls: ['./add-calibration-page.component.css', '../calibration-breadcrumb-shell.css'],
})
export class AddCalibrationPageComponent {
  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
