import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LoginFormComponent } from './login-form.component';
import { User } from '../../../domain/model/user.entity';
import { AuthService } from '../../../infrastructure/AuthService';
import { UserService } from '../../../infrastructure/user.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    userServiceSpy = jasmine.createSpyObj<UserService>('UserService', ['getUserByEmail']);

    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));
    userServiceSpy.getUserByEmail.and.returnValue(of(new User()));

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when email and password are empty', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });

    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should be invalid when email format is incorrect', () => {
    component.loginForm.setValue({
      email: 'invalid-email',
      password: 'ValidPassword123',
    });

    expect(component.loginForm.invalid).toBeTrue();
    expect(component.loginForm.get('email')?.hasError('email')).toBeTrue();
  });

  it('should call the mocked auth service when form data is valid', () => {
    const email = 'barista@cafelab.com';
    const password = 'ValidPassword123';

    userServiceSpy.getUserByEmail.and.returnValue(
      of(
        new User({
          id: 1,
          email,
          hasPlan: true,
        }),
      ),
    );

    component.loginForm.setValue({ email, password });
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(authServiceSpy.login).toHaveBeenCalledOnceWith(email, password);
  });
});
