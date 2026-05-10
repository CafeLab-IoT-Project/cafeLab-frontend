import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbar } from '@angular/material/toolbar';

import { PortfolioService } from '../../../infrastructure/portfolio.service';
import { RecipeService } from '../../../infrastructure/recipe.service';
import { Portfolio } from '../../../domain/model/portfolio.entity';
import { Recipe } from '../../../domain/model/recipe.entity';
import { CreatePortfolioDialogComponent } from '../../components/create-portfolio-dialog/create-portfolio-dialog.component';
import { ToolbarComponent } from '../../../../public/presentation/components/toolbar/toolbar.component';
import { AuthService } from '../../../../auth/infrastructure/AuthService';
import { DashboardNavigationService } from '../../../../shared/infrastructure/dashboard-navigation.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    TranslateModule,
    MatToolbar,
    ToolbarComponent
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css', '../preparation-breadcrumb-shell.css'],
})
export class RecipeListComponent implements OnInit {
  portfolios: Portfolio[] = [];
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchTerm: string = '';

  constructor(
    private portfolioService: PortfolioService,
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private dashboardNavigation: DashboardNavigationService,
  ) {}

  ngOnInit(): void {
    this.loadPortfolios();
    this.loadRecipes();
  }

  loadPortfolios(): void {
    this.portfolioService.getAll().subscribe(portfolios => {
      this.portfolios = portfolios;
    });
  }

  loadRecipes(): void {
    this.recipeService.getAll().subscribe(recipes => {
      this.recipes = recipes.filter(r => !r.portfolioId);
      this.filteredRecipes = [...this.recipes];
    });
  }

  filterRecipes(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredRecipes = [...this.recipes];
      return;
    }
    this.filteredRecipes = this.recipes.filter(r =>
      r.name.toLowerCase().includes(term)
    );
  }

  openCreatePortfolioDialog(): void {
    const dialogRef = this.dialog.open(CreatePortfolioDialogComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        const newPortfolio: Portfolio = {
          id: 0,
          userId: 0,
          name: result.name,
          createdAt: null,
        };
        this.portfolioService.create(newPortfolio).subscribe(() => {
          this.loadPortfolios();
        });
      }
    });
  }

  navigateToPortfolio(portfolioId: number): void {
    this.router.navigate(['/preparation/portfolios', portfolioId]);
  }

  navigateToCreateRecipe(): void {
    this.router.navigate(['/preparation/recipes/create']).then(success => {
      if (!success) {
        console.error('Error en la navegación a crear receta');
      }
    });
  }

  goToHome(): void {
    this.dashboardNavigation.goToHome();
  }
}