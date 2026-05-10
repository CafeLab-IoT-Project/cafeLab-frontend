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
});
