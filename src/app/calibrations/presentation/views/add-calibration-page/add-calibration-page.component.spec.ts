import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { AddNewCalibrationComponent } from '../../components/add-new-calibration/add-new-calibration.component';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { AddCalibrationPageComponent } from './add-calibration-page.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: '',
})
class StubToolbarComponent {}

@Component({
  selector: 'app-add-new-calibration',
  standalone: true,
  template: '',
})
class StubAddNewCalibrationComponent {}

describe('AddCalibrationPageComponent', () => {
  let component: AddCalibrationPageComponent;
  let fixture: ComponentFixture<AddCalibrationPageComponent>;

  beforeEach(async () => {
    const dashboardNavigationSpy = jasmine.createSpyObj<DashboardNavigationService>(
      'DashboardNavigationService',
      ['goToHome'],
    );

    await TestBed.configureTestingModule({
      imports: [
        AddCalibrationPageComponent,
        TranslateModule.forRoot(),
        StubToolbarComponent,
        StubAddNewCalibrationComponent,
      ],
      providers: [
        { provide: DashboardNavigationService, useValue: dashboardNavigationSpy },
      ],
    })
      .overrideComponent(AddCalibrationPageComponent, {
        remove: {
          imports: [ToolbarComponent, AddNewCalibrationComponent],
        },
        add: {
          imports: [StubToolbarComponent, StubAddNewCalibrationComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AddCalibrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
