import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogupBaristaSuccessPageComponent } from './logup-barista-success-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';

describe('LogupBaristaSuccessPageComponent', () => {
  let component: LogupBaristaSuccessPageComponent;
  let fixture: ComponentFixture<LogupBaristaSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LogupBaristaSuccessPageComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogupBaristaSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
