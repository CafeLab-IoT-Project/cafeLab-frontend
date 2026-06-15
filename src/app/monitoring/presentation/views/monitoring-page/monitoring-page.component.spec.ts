import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import {
  MonitoringHubCardComponent,
  type MonitoringHubCardData,
} from '../../components/monitoring-hub-card/monitoring-hub-card.component';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { MonitoringPageComponent } from './monitoring-page.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

@Component({
  selector: 'app-monitoring-hub-card',
  standalone: true,
  template: '',
})
class StubMonitoringHubCardComponent {
  @Input({ required: true }) card!: MonitoringHubCardData;
}

describe('MonitoringPageComponent', () => {
  let component: MonitoringPageComponent;
  let fixture: ComponentFixture<MonitoringPageComponent>;
  let dashboardNavigationSpy: jasmine.SpyObj<DashboardNavigationService>;

  beforeEach(async () => {
    dashboardNavigationSpy = jasmine.createSpyObj<DashboardNavigationService>(
      'DashboardNavigationService',
      ['goToHome'],
    );

    await TestBed.configureTestingModule({
      imports: [MonitoringPageComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: DashboardNavigationService, useValue: dashboardNavigationSpy },
      ],
    })
      .overrideComponent(MonitoringPageComponent, {
        remove: { imports: [ToolbarComponent, MonitoringHubCardComponent] },
        add: { imports: [StubToolbarComponent, StubMonitoringHubCardComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MonitoringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose monitoring hub cards for lots, configuration, alerts and analytics', () => {
    expect(component.hubCards.length).toBe(4);
    expect(component.hubCards.map((card) => card.routeLink)).toEqual([
      '/monitoring/lots',
      '/monitoring/configuration',
      '/monitoring/alerts',
      '/monitoring/analytics',
    ]);
  });

  it('should navigate to home through dashboard navigation service', () => {
    component.goToHome();
    expect(dashboardNavigationSpy.goToHome).toHaveBeenCalled();
  });
});
