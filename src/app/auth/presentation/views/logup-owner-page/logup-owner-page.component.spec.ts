import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogupOwnerPageComponent } from './logup-owner-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';


describe('LogupOwnerPageComponent', () => {
  let component: LogupOwnerPageComponent;
  let fixture: ComponentFixture<LogupOwnerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LogupOwnerPageComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogupOwnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
