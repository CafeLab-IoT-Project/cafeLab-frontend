import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricsCardComponent } from './metrics-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MetricsCardComponent', () => {
  let component: MetricsCardComponent;
  let fixture: ComponentFixture<MetricsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MetricsCardComponent,
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MetricsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the metric values received as inputs', () => {
    component.costPerKg = 12.5;
    component.potentialMargin = 45.2;
    component.suggestedPrice = 18.75;
    component.currencySymbol = '$';

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(text).toContain('$ 12.50');
    expect(text).toContain('45.2%');
    expect(text).toContain('$ 18.75');
  });
});
