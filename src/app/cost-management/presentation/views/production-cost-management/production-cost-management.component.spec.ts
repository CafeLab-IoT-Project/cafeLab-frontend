import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { CoffeeLotApi } from '../../../../coffee-lot/application/coffee-lot.api';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { ProductionCostRecordApi } from '../../../../production-cost-record/application/production-cost-record.api';
import { ProductionCostService } from '../../../infrastructure/production-cost.service';
import { CostRecordsListComponent } from '../../components/cost-records-list/cost-records-list.component';
import { MetricsCardComponent } from '../../components/metrics-card/metrics-card.component';
import { StepDirectCostsComponent } from '../../components/step-direct-costs/step-direct-costs.component';
import { StepIndirectCostsComponent } from '../../components/step-indirect-costs/step-indirect-costs.component';
import { StepLotSelectionComponent } from '../../components/step-lot-selection/step-lot-selection.component';
import { ProductionCostPageComponent } from './production-cost-management.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

@Component({
  selector: 'app-metrics-card',
  standalone: true,
  template: '',
})
class StubMetricsCardComponent {}

@Component({
  selector: 'app-step-lot-selection',
  standalone: true,
  template: '',
})
class StubStepLotSelectionComponent {}

@Component({
  selector: 'app-step-direct-costs',
  standalone: true,
  template: '',
})
class StubStepDirectCostsComponent {}

@Component({
  selector: 'app-step-indirect-costs',
  standalone: true,
  template: '',
})
class StubStepIndirectCostsComponent {}

@Component({
  selector: 'app-cost-records-list',
  standalone: true,
  template: '',
})
class StubCostRecordsListComponent {
  @Output() newCalculation = new EventEmitter<void>();

  reload(): void {}
}

describe('ProductionCostPageComponent', () => {
  let component: ProductionCostPageComponent;
  let fixture: ComponentFixture<ProductionCostPageComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getCurrentUserId']);
    const productionCostServiceSpy = jasmine.createSpyObj<ProductionCostService>(
      'ProductionCostService',
      ['calculateProductionCost', 'generatePDF'],
    );
    const coffeeLotApiSpy = jasmine.createSpyObj<CoffeeLotApi>('CoffeeLotApi', ['getAll']);
    const productionCostRecordApiSpy = jasmine.createSpyObj<ProductionCostRecordApi>(
      'ProductionCostRecordApi',
      ['create'],
    );
    const dashboardNavigationSpy = jasmine.createSpyObj<DashboardNavigationService>(
      'DashboardNavigationService',
      ['goToHome'],
    );

    authServiceSpy.getCurrentUserId.and.returnValue('7');
    coffeeLotApiSpy.getAll.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        ProductionCostPageComponent,
        TranslateModule.forRoot(),
        StubToolbarComponent,
        StubMetricsCardComponent,
        StubStepLotSelectionComponent,
        StubStepDirectCostsComponent,
        StubStepIndirectCostsComponent,
        StubCostRecordsListComponent,
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ProductionCostService, useValue: productionCostServiceSpy },
        { provide: CoffeeLotApi, useValue: coffeeLotApiSpy },
        { provide: ProductionCostRecordApi, useValue: productionCostRecordApiSpy },
        { provide: DashboardNavigationService, useValue: dashboardNavigationSpy },
      ],
    })
      .overrideComponent(ProductionCostPageComponent, {
        remove: {
          imports: [
            ToolbarComponent,
            MetricsCardComponent,
            StepLotSelectionComponent,
            StepDirectCostsComponent,
            StepIndirectCostsComponent,
            CostRecordsListComponent,
          ],
        },
        add: {
          imports: [
            StubToolbarComponent,
            StubMetricsCardComponent,
            StubStepLotSelectionComponent,
            StubStepDirectCostsComponent,
            StubStepIndirectCostsComponent,
            StubCostRecordsListComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductionCostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
