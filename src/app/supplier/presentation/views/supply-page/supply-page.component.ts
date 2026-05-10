import { Component, OnInit } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {ToolbarComponent} from '../../../../public/presentation/components/toolbar/toolbar.component';
import {SupplierListComponent} from '../../components/provider-list/supplier-list.component';
import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-supply-page',
  standalone: true,
  imports: [
    MatToolbar,
    ToolbarComponent,
    SupplierListComponent,
    TranslateModule
  ],
  templateUrl: './supply-page.component.html',
  styleUrl: './supply-page.component.css'
})
export class SupplyPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardNavigation: DashboardNavigationService,
  ) {}

  ngOnInit(): void {
  }

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }

  refreshSuppliers(): void {
    window.location.reload();
  }
}