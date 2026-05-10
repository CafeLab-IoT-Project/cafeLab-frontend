import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { Recipe } from '../../../domain/model/recipe.entity';
import { RecipeService } from '../../../infrastructure/recipe.service';
import { AddRecipeDialogComponent } from './add-recipe-dialog.component';

describe('AddRecipeDialogComponent', () => {
  let component: AddRecipeDialogComponent;
  let fixture: ComponentFixture<AddRecipeDialogComponent>;
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddRecipeDialogComponent>>;

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
      portfolioId: 5,
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
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<AddRecipeDialogComponent>>('MatDialogRef', [
      'close',
    ]);

    recipeServiceSpy.getAll.and.returnValue(of(mockRecipes));

    await TestBed.configureTestingModule({
      imports: [AddRecipeDialogComponent],
      providers: [
        { provide: RecipeService, useValue: recipeServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { portfolioId: 10 } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load available recipes from the mocked recipe service', () => {
    const options = fixture.nativeElement.querySelectorAll('mat-list-option');

    expect(recipeServiceSpy.getAll).toHaveBeenCalledTimes(1);
    expect(component.availableRecipes.length).toBe(1);
    expect(component.availableRecipes[0].name).toBe('V60 Citrico');
    expect(options.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('V60 Citrico');
  });

  it('should close the dialog with selected recipes when confirming', () => {
    component.toggleRecipeSelection(1);
    component.onAddRecipes();

    expect(component.selectedRecipes).toEqual([1]);
    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith([1]);
  });
});
