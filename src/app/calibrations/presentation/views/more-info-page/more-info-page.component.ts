import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MoreInfoCalibrationComponent } from '../../components/more-info-calibration/more-info-calibration.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-more-info-page',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, MoreInfoCalibrationComponent, TranslatePipe],
  templateUrl: './more-info-page.component.html',
  styleUrls: ['./more-info-page.component.css', '../calibration-breadcrumb-shell.css'],
})
export class MoreInfoPageComponent {
  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
