import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { DefectLibraryDetailComponent } from '../../components/defect-library-detail/defect-library-detail.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-view-defect-library-detail',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, DefectLibraryDetailComponent, TranslatePipe, RouterLink],
  templateUrl: './view-defect-library-detail.component.html',
  styleUrl: './view-defect-library-detail.component.css',
})
export class ViewDefectLibraryDetailComponent {
  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
