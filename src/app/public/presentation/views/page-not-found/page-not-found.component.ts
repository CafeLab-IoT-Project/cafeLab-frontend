import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatToolbar, ToolbarComponent, TranslatePipe],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent implements OnInit {
  protected invalidPath = '';

  private router = inject(Router);
  private dashboardNavigation = inject(DashboardNavigationService);

  ngOnInit(): void {
    const url = this.router.url.split('?')[0].replace(/^\//, '');
    this.invalidPath = url || '—';
  }

  protected onNavigateToFeatures(): void {
    this.dashboardNavigation.goToHome();
  }
}