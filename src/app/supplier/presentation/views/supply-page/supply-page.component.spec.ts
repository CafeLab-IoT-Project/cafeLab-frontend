import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplyPageComponent } from './supply-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';


describe('SupplyPageComponent', () => {
  let component: SupplyPageComponent;
  let fixture: ComponentFixture<SupplyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SupplyPageComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
