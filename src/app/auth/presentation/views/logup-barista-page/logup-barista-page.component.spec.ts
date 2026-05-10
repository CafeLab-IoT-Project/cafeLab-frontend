import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogupBaristaPageComponent } from './logup-barista-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';

describe('LogupBaristaPageComponent', () => {
  let component: LogupBaristaPageComponent;
  let fixture: ComponentFixture<LogupBaristaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LogupBaristaPageComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogupBaristaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
