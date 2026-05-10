import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { EditCalibrationComponent } from '../../components/edit-calibration/edit-calibration.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-edit-calibration-page',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, EditCalibrationComponent, TranslatePipe],
  templateUrl: './edit-calibration-page.component.html',
  styleUrls: ['./edit-calibration-page.component.css', '../calibration-breadcrumb-shell.css'],
})
export class EditCalibrationPageComponent {
  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
