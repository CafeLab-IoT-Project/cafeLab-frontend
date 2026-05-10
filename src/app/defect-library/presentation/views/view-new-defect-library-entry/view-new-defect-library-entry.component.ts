import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { AddDefectLibraryEntryComponent } from '../../components/add-defect-library-entry/add-defect-library-entry.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-view-new-defect-library-entry',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, AddDefectLibraryEntryComponent, TranslatePipe, RouterLink],
  templateUrl: './view-new-defect-library-entry.component.html',
  styleUrl: './view-new-defect-library-entry.component.css',
})
export class ViewNewDefectLibraryEntryComponent {
  constructor(private readonly dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}
