import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';
import { Portfolio } from '../../../domain/model/portfolio.entity';
import { Recipe } from '../../../domain/model/recipe.entity';
import { PortfolioService } from '../../../infrastructure/portfolio.service';
import { RecipeService } from '../../../infrastructure/recipe.service';
import { RecipeListComponent } from './recipe-list.component';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;
  let portfolioServiceSpy: jasmine.SpyObj<PortfolioService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let router: Router;

  const mockPortfolios: Portfolio[] = [
    {
      id: 1,
      userId: 7,
      name: 'Filtrados',
      createdAt: null,
    },
  ];

  const mockRecipes: Recipe[] = [
    {
      id: 1,
      userId: 7,
      name: 'V60 Citrico',
      imageUrl: '/assets/v60.png',
      extractionMethod: 'v60',
      extractionCategory: 'coffee',
      ratio: '1:15',
      cuppingSessionId: null,
      portfolioId: null,
      preparationTime: 180,
      steps: 'Bloom y vertidos',
      tips: 'Agua a 93C',
      cupping: '',
      grindSize: 'Medium',
      createdAt: '2026-01-01T00:00:00Z',
      ingredients: [],
    },
    {
      id: 2,
      userId: 7,
      name: 'Espresso Base',
      imageUrl: '/assets/espresso.png',
      extractionMethod: 'espresso',
      extractionCategory: 'espresso',
      ratio: '1:2',
      cuppingSessionId: null,
      portfolioId: null,
      preparationTime: 30,
      steps: 'Extraccion',
      tips: 'Molido fino',
      cupping: '',
      grindSize: 'Fine',
      createdAt: '2026-01-01T00:00:00Z',
      ingredients: [],
    },
  ];

  beforeEach(async () => {
    recipeServiceSpy = jasmine.createSpyObj<RecipeService>('RecipeService', ['getAll']);
    portfolioServiceSpy = jasmine.createSpyObj<PortfolioService>('PortfolioService', [
      'getAll',
      'create',
    ]);
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'logout',
      'getCurrentUser',
      'getCurrentUserId',
    ]);
    const dashboardNavigationSpy = jasmine.createSpyObj<DashboardNavigationService>(
      'DashboardNavigationService',
      ['goToHome'],
    );

    recipeServiceSpy.getAll.and.returnValue(of(mockRecipes));
    portfolioServiceSpy.getAll.and.returnValue(of(mockPortfolios));
    portfolioServiceSpy.create.and.returnValue(of(mockPortfolios[0]));
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(undefined),
    } as never);
    authServiceSpy.getCurrentUserId.and.returnValue('7');

    await TestBed.configureTestingModule({
      imports: [RecipeListComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RecipeService, useValue: recipeServiceSpy },
        { provide: PortfolioService, useValue: portfolioServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DashboardNavigationService, useValue: dashboardNavigationSpy },
      ],
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        BREADCRUMB: {
          HOME: 'Home',
          BREW_RECIPES: 'Brew recipes',
        },
        portfolio: {
          title: 'Portfolios',
          create: 'Create portfolio',
        },
        recipes: {
          title: 'Recipes',
          create: 'Create recipe',
          creation: {
            name_placeholder: 'Search by name',
            extraction_methods: {
              coffee: 'Coffee',
              espresso: 'Espresso',
              v60: 'V60',
            },
          },
        },
      },
      true,
    );
    translate.use('en');

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mocked recipes loaded from the recipe service', () => {
    const recipeCards = fixture.nativeElement.querySelectorAll('.recipe-card');

    expect(recipeServiceSpy.getAll).toHaveBeenCalledTimes(1);
    expect(component.filteredRecipes.length).toBe(2);
    expect(recipeCards.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('V60 Citrico');
    expect(fixture.nativeElement.textContent).toContain('Espresso Base');
  });

  it('should call the mocked service when a valid portfolio is submitted from the dialog', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => of({ name: 'Recetas de temporada' }),
    } as never);
    (component as unknown as { dialog: MatDialog }).dialog = dialogSpy;

    component.openCreatePortfolioDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(portfolioServiceSpy.create).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        name: 'Recetas de temporada',
      }),
    );
  });
});
