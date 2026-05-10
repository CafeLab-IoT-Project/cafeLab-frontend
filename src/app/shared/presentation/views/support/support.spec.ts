import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Support } from './support';
import { TranslateModule } from '@ngx-translate/core';

describe('Support', () => {
  let component: Support;
  let fixture: ComponentFixture<Support>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Support,
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Support);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
