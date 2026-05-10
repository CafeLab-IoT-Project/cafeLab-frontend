import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { User } from '../../../../auth/domain/model/user.entity';
import { UserService } from '../../../../auth/infrastructure/user.service';
import { SelectPlanComponent } from './select-plan.component';

describe('SelectPlanComponent', () => {
  let component: SelectPlanComponent;
  let fixture: ComponentFixture<SelectPlanComponent>;
  let router: Router;
  let translate: TranslateService;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', [
      'updateProfile',
      'mergeProfileResponse',
    ]);

    userServiceSpy.updateProfile.and.returnValue(of(new User()));
    userServiceSpy.mergeProfileResponse.and.callFake((currentUser: User, apiUser: User) => {
      return new User({ ...currentUser, ...apiUser });
    });

    localStorage.setItem(
      'currentUser',
      JSON.stringify(
        new User({
          id: 7,
          role: 'barista',
          email: 'barista@cafelab.com',
        }),
      ),
    );

    await TestBed.configureTestingModule({
      imports: [SelectPlanComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        PLANS: {
          MONTH: 'month',
          BARISTA: {
            TITLE: 'Barista Plan',
            BUTTON: 'Choose barista',
            FEATURES: ['Recipes', 'Inventory'],
          },
          OWNER: {
            TITLE: 'Owner Plan',
            BUTTON: 'Choose owner',
            FEATURES: ['Reports', 'Staff'],
          },
          FULL: {
            TITLE: 'Full Plan',
            BUTTON: 'Choose full',
            FEATURES: ['Recipes', 'Reports', 'Staff'],
          },
        },
      },
      true,
    );
    translate.use('en');

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);

    fixture = TestBed.createComponent(SelectPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedPlan');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show plan options for the current user', () => {
    const planCards = fixture.nativeElement.querySelectorAll('.plan-card');

    expect(planCards.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Barista Plan');
    expect(fixture.nativeElement.textContent).toContain('Full Plan');
  });

  it('should use the mocked subscription flow when selecting a plan', () => {
    userServiceSpy.updateProfile.and.returnValue(
      of(
        new User({
          id: 7,
          role: 'barista',
          email: 'barista@cafelab.com',
          plan: 'barista',
          hasPlan: false,
        }),
      ),
    );

    component.selectPlan('barista');

    expect(userServiceSpy.updateProfile).toHaveBeenCalledOnceWith(
      7,
      jasmine.objectContaining({
        id: 7,
        plan: 'barista',
        hasPlan: false,
      }),
    );
    expect(JSON.parse(localStorage.getItem('selectedPlan') || '{}')).toEqual(
      jasmine.objectContaining({
        type: 'barista',
        name: 'Barista Plan',
        price: 9,
      }),
    );
  });
});
