import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { LotListComponent } from '../../components/lot-list/lot-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-lots-page',
  standalone: true,
  imports: [
    MatToolbar,
    ToolbarComponent,
    LotListComponent,
    TranslateModule
  ],
  templateUrl: './lots.component.html',
  styleUrl: './lots.component.css'
})
export class LotsComponent {
  constructor(private dashboardNavigation: DashboardNavigationService) {}

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }

  refreshLots(): void {
    window.location.reload();
  }
}
